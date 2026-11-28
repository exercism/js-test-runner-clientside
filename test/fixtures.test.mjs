/**
 * Runs every fixture in test/fixtures through the built runner (output/) in
 * headless Chromium, once in worker mode and once in main-thread mode.
 *
 * $ yarn test
 *
 * To rewrite the snapshots from the current output:
 *
 * $ yarn test:update
 */

import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { basename, join, relative, sep } from "node:path";
import { after, before, describe, test } from "node:test";
import { chromium } from "playwright";

const root = join(import.meta.dirname, "..");
const fixturesDir = join(import.meta.dirname, "fixtures");
const outputDir = join(root, "output");
const pagePath = join(import.meta.dirname, "browser", "index.html");

const UPDATE = process.env.UPDATE_SNAPSHOTS === "1";
const MODES = ["worker", "main-thread"];

// The server runner's expected output. The harness does not send it to the
// runner.
const SERVER_RESULTS = "expected_results.json";

// This runner's snapshots, one per mode, such as
// expected_clientside_results.worker.json.
const SNAPSHOT_PREFIX = "expected_clientside_results.";

// Two fixtures have no expected_results.json. The server runner's smoke test
// (test/smoke.test.mjs in exercism/javascript-test-runner) checks their status.
const SERVER_STATUS = {
  "two-fer/error/missing": "error",
  "two-fer/npm": "pass",
};

// This fixture has no test file, so the runner stops before it starts a worker.
const FAILS_BEFORE_RUNNING = new Set(["two-fer/error/missing"]);

// The runner gives this message when the tests run for more than 30 seconds.
const TIMEOUT_MESSAGE = "Did not finish the tests within reasonable time";

// Fixtures where the result differs in spirit from the server runner, with the
// reason. Each one runs as a TODO, so the difference stays in the test report.
const SERVER_DIFFERENCES = {
  "two-fer/fail/tests": {
    all: "the runner stops at the first failing test, so the third test is missing",
  },
  "two-fer/error/empty": {
    worker: "the worker does not report a failed import, so the run times out",
  },
  "two-fer/error/malformed_tests": {
    worker: "the worker does not report a failed import, so the run times out",
  },
  "two-fer/error/syntax": {
    worker: "the worker does not report a failed import, so the run times out",
  },
};

function findFixtures(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const hasSolution = entries.some(
    (entry) => entry.isFile() && entry.name.endsWith(".js"),
  );

  if (hasSolution) {
    return [dir];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => findFixtures(join(dir, entry.name)));
}

function readFiles(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return readFiles(path, base);
    }

    if (
      entry.name === SERVER_RESULTS ||
      entry.name.startsWith(SNAPSHOT_PREFIX)
    ) {
      return [];
    }

    return [
      [relative(base, path).split(sep).join("/"), readFileSync(path, "utf8")],
    ];
  });
}

/**
 * The website always sends .meta/config.json, which this runner requires. The
 * server runner also accepts .exercism/config.json, or guesses the file names
 * from the slug. This does the same, so every fixture can run as it is.
 */
function readSolution(slug, fixture) {
  const files = Object.fromEntries(readFiles(fixture));

  if (!files[".meta/config.json"]) {
    files[".meta/config.json"] =
      files[".exercism/config.json"] ??
      JSON.stringify({
        files: { solution: [`${slug}.js`], test: [`${slug}.spec.js`] },
      });
  }

  const config = JSON.parse(files[".meta/config.json"]);
  return { files, userPaths: config.files.solution };
}

/**
 * Blob URLs and the port change on every run.
 */
function normalise(result) {
  return JSON.parse(
    JSON.stringify(result)
      .replace(/blob:http:\/\/127\.0\.0\.1:\d+\/[0-9a-f-]+/g, "blob:<url>")
      .replace(/http:\/\/127\.0\.0\.1:\d+/g, "http://<host>"),
  );
}

function serve() {
  const server = createServer((request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    const file = path === "/" ? pagePath : join(outputDir, basename(path));

    if (!existsSync(file)) {
      response.writeHead(404);
      response.end();
      return;
    }

    response.writeHead(200, {
      "content-type": file.endsWith(".html") ? "text/html" : "text/javascript",
    });
    response.end(readFileSync(file));
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const fixtures = findFixtures(fixturesDir).map((dir) => {
  const name = relative(fixturesDir, dir).split(sep).join("/");
  return { name, dir, slug: name.split("/")[0] };
});

let server;
let browser;
let origin;

before(async () => {
  if (!existsSync(join(outputDir, "imported.mjs"))) {
    throw new Error("Run `yarn build` before running the tests.");
  }

  server = await serve();
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.close();
});

/**
 * Each run gets a fresh page, so one run can't leak globals or console
 * listeners into the next.
 */
async function runFixture(fixture, mode) {
  const page = await browser.newPage();

  try {
    await page.goto(`${origin}/?mode=${mode}`);
    await page.waitForFunction(() => window.ready === true);

    const { files, userPaths } = readSolution(fixture.slug, fixture.dir);
    const result = await page.evaluate(
      ([slug, files, userPaths]) => window.runFixture(slug, files, userPaths),
      [fixture.slug, files, userPaths],
    );
    const workersStarted = await page.evaluate(() => window.__workersStarted);

    return { result: normalise(result), workersStarted };
  } finally {
    await page.close();
  }
}

/**
 * The comparison covers the overall status, and each test's name, status,
 * output and code. The server runner gives null as the code of a test named
 * with a template literal, and this runner gives the code. So the comparison
 * leaves out the code where the server runner gives null.
 */
function summarise(result, serverResult = result) {
  return {
    status: result.status,
    tests: (result.tests ?? []).map(
      ({ name, status, output, test_code }, i) => {
        const serverCode = serverResult.tests?.[i]?.test_code;
        return serverCode === null
          ? { name, status, output }
          : { name, status, output, test_code };
      },
    ),
  };
}

function assertAgreesWithServer(fixture, actual) {
  const serverResultsPath = join(fixture.dir, SERVER_RESULTS);

  if (!existsSync(serverResultsPath)) {
    assert.equal(actual.status, SERVER_STATUS[fixture.name]);
    return;
  }

  const expected = JSON.parse(readFileSync(serverResultsPath, "utf8"));
  assert.deepEqual(summarise(actual, expected), summarise(expected));

  if (expected.status === "error") {
    assert.notEqual(
      actual.message,
      TIMEOUT_MESSAGE,
      "expected the run to report the error instead of timing out",
    );
  }
}

// Fixtures run in parallel. When a run times out, it takes 30 seconds.
describe("fixtures", { concurrency: 8 }, () => {
  for (const fixture of fixtures) {
    describe(fixture.name, { concurrency: true }, () => {
      for (const mode of MODES) {
        test(`${mode} mode`, { timeout: 60_000 }, async (t) => {
          const run = await runFixture(fixture, mode);
          const snapshotPath = join(
            fixture.dir,
            `${SNAPSHOT_PREFIX}${mode}.json`,
          );

          await t.test("runs in the expected mode", () => {
            if (mode === "main-thread") {
              assert.equal(run.workersStarted, 0, "expected no worker");
            } else if (!FAILS_BEFORE_RUNNING.has(fixture.name)) {
              assert.ok(run.workersStarted > 0, "expected a worker");
            }
          });

          await t.test("matches the snapshot", () => {
            if (UPDATE) {
              writeFileSync(
                snapshotPath,
                JSON.stringify(run.result, null, 2) + "\n",
              );
            }

            assert.ok(existsSync(snapshotPath), `missing ${snapshotPath}`);
            const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));
            assert.deepEqual(run.result, snapshot);
          });

          const differences = SERVER_DIFFERENCES[fixture.name] ?? {};
          await t.test(
            "agrees with the server runner",
            { todo: differences.all ?? differences[mode] },
            () => assertAgreesWithServer(fixture, run.result),
          );
        });
      }
    });
  }
});
