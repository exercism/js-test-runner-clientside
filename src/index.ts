// const process = { env: { NODE_ENV: 'PRODUCTION' }, argv: [], version: "", cwd: () => ".", platform: '' };

import { generateOutput, type OutputInterface } from "./output";
import type { FailedTestRun, TestRun } from "./types";
import {
  findTestCode,
  findUserCode,
  readConfig,
  type CustomJavaScriptConfig,
} from "./utils";

import jestExpect from "expect";
import jest from "jest-mock";

export async function runTests(
  _slug: string,
  files: Record<string, string>,
  userPaths: string[],
  transpile: (code: string, type: "code" | "test") => string = (code) => code,
): Promise<OutputInterface> {
  return runTests_(files, userPaths, transpile).catch((error: unknown) => {
    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (Object.prototype.hasOwnProperty.call(error, "message")) {
      message = String((error as { message: unknown }).message);
    } else if (Object.prototype.hasOwnProperty.call(error, "toString")) {
      message = (error as { toString(): string }).toString();
    } else {
      throw error;
    }

    return {
      version: 1,
      status: "error",
      message,
      tests: [],
    };
  });
}

async function runTests_(
  files: Record<string, string>,
  userPaths: string[],
  transpile: (code: string, type: "code" | "test") => string,
) {
  const config = readConfig<CustomJavaScriptConfig>(files);

  // Get all user provided code
  const userCodes = findUserCode(config, files, userPaths);
  for (const path in userCodes) {
    userCodes[path] = transpile(userCodes[path], "code");
  }

  // Get all test code (strip user submitted)
  const testCodes = findTestCode(config, files, userPaths);
  for (const path in testCodes) {
    testCodes[path] = transpile(testCodes[path], "test");
  }

  const runOptions = {
    enableTaskIds: Boolean(config.custom["flag.tests.task-per-describe"]),
  };

  const { entry, urls } = prepareTest(testCodes, userCodes, runOptions);

  // Set some globals
  const globals = globalThis as Record<string, any>;
  globals["expect"] = jestExpect;
  globals["jest"] = jest;

  let timer: undefined | NodeJS.Timeout;
  let interval: undefined | NodeJS.Timeout;

  function cleanup() {
    console.debug("[suite] cleaning up run", urls);
    urls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));

    clearInterval(interval);
    clearTimeout(timer);

    // Clear globals
    delete globals["expect"];
    delete globals["jest"];
  }

  const result = await import(/* webpackIgnore: true */ `${entry}`)
    .then<TestRun>((result) => {
      if (result.run.completed) {
        return result.run;
      }

      return new Promise<TestRun>((resolve, reject) => {
        timer = setTimeout(
          () => {
            clearInterval(interval);

            reject(
              new Error("Did not finish the tests within reasonable time"),
            );
          },
          100 * 10 * 30 /* 30 seconds */,
        );

        interval = setInterval(() => {
          if (result.run.completed) {
            clearTimeout(timer);
            clearInterval(interval);

            resolve(result.run);
          }
        }, 100);
      });
    })
    .catch<FailedTestRun>((error) => {
      console.error("[suite] failed to run the tests \n", error);

      return { ...({ message: error.message } as FailedTestRun) };
    });

  cleanup();

  // Wait an animation frame
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Generate output
  return generateOutput(result, config.custom);
}

function prepareTest(
  tests: Record<string, string>,
  code: Record<string, string>,
  options: { enableTaskIds: boolean } = { enableTaskIds: false },
): { entry: string; urls: string[] } {
  const globalLogger = esm`
    const listeners = []
    const originalConsoleLog = console.log.bind(console)

    export function log(...args) {
      args.forEach((arg) => {
        const message = JSON.stringify(arg, null, 2)
        listeners.forEach((listener) => listener(message))
      })

      originalConsoleLog(...args)
    }

    console.log = log

    export function addListener(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }
  `;

  const urls: string[] = [];

  for (const userPath in code) {
    const userCode = `
import { log } from '${globalLogger}'

${code[userPath]}
  `;

    if (userCode.includes("module.exports = ")) {
      throw new Error(
        "You must use ESM export syntax. Remove all references to module.exports and exports.<...> from the code (including comments) to continue.",
      );
    }

    const importableCode = esm`${userCode}`;
    urls.push(importableCode);

    const userPathParts = userPath.split("/");
    const fileName = userPathParts.pop() || "";
    const fileNameParts = fileName.split(".");
    fileNameParts.pop();

    const importName = [...userPathParts, fileNameParts.join(".")].join("/");

    const regexp = new RegExp(
      `\\./${importName}(?:\\.(?:ts|js|mjs|cjs|mts|cts|tsx|jsx))?`,
    );

    for (const testPath in tests) {
      tests[testPath] = tests[testPath].replace(regexp, `${importableCode}`);
    }
  }

  for (const testPath in tests) {
    const lines = tests[testPath].split("\n");

    // Delete globals import
    const globalsImportLineIndex = lines.findIndex(
      (l) =>
        l.indexOf("import ") !== -1 && l.indexOf("from '@jest/globals'") !== -1,
    );
    if (globalsImportLineIndex !== -1) {
      lines.splice(
        globalsImportLineIndex,
        1,
        "// import { ... } from '@jest/globals'",
      );
    }

    // Add test helper below main `import { ... } from './solution`
    let injectIndex = lines.findIndex((l) => l.indexOf("from ") !== -1) + 1;
    if (injectIndex === -1) {
      lines.unshift(...TEST_HELPER);
    } else {
      lines.splice(injectIndex, 0, TEST_HELPER);
    }

    // Add log listener
    const logImport = `import { addListener as addLogListener } from '${globalLogger}'`;
    if (injectIndex === -1) {
      lines.unshift(logImport);
    } else {
      lines.splice(injectIndex, 0, logImport);
    }

    const importableTestCode = esm`${lines.join("\n")}`;
    urls.push(importableTestCode);
  }

  return { entry: urls[urls.length - 1], urls };
}

const esm = ({ raw }: TemplateStringsArray, ...vals: string[]) =>
  URL.createObjectURL(
    new Blob([String.raw({ raw } as any, ...vals)], {
      type: "text/javascript",
    }),
  );

const TEST_HELPER = `
const run = {
  taskId: 0,
  failed: 0,
  skipped: 0,
  passed: 0,
  messages: [],
  logs: [],
  promises: [],
	result: null,
  completed: null
}

function log(logMessage) {
  // TODO track task id when logging, somehow
  run.logs[0] ||= []
  run.logs[0].push(logMessage)
}

const removeLogListener = addLogListener(log)

let failFast = true
let awaiting = 0

function startTest(taskId, name) {
  awaiting += 1
  console.debug("[test] "+ name)

  run.messages[taskId] ||= []
}

function passTest(taskId, name) {
  awaiting -= 1
  run.passed += 1

  run.messages[taskId] ||= []
  run.messages[taskId].push({ test: name, status: 'passed' })
}

function failTest(taskId, name, err) {
  awaiting -= 1
  run.failed += 1

  run.messages[taskId] ||= []
  run.messages[taskId].push({ test: name, status: 'failed', details: err.message, err: err })

	window.lastErr = err

  if (err.constructor.name === 'JestAssertionError') {
    console.error(\`[test] failed assertion of \${name}.\\n\`, err.message)
  } else if (err instanceof SyntaxError) {
    failFast = true
    console.error(\`[test] syntax is not valid JavaScript \\n\`, err)
  } else {
    console.error(\`[test] failed to run \${name} \\n\`, err)
  }
}

function skipTest() {
  run.skipped += 1
}

function runSuite(name) {
  console.debug("[suite] " + name)
  awaiting += 1
  run.taskId += 1
}

function finishSuite() {
  awaiting -= 1
  if (awaiting > 0) {
    return console.debug(\`[suite] still running, awaiting \${awaiting}\`)
  }

  run.result = run.failed === 0 ? 'passed' : 'failed'
	run.completed = true

  removeLogListener();
}

async function test(name, c) {
  const taskId = run.taskId

  if (failFast && run.failed > 0) {
    skipTest()
    return
  }

  startTest(taskId, name)

  try {
    await c()
    passTest(taskId, name)
  } catch (err) {
    failTest(taskId, name, err)
  }
}

const xtest = test
const it = test
const xit = test

async function describe(name, c) {
  runSuite(name)

  const taskId = run.taskId

  try {
    await c()
    await Promise.all(run.promises)
  } catch (err) {
    run.messages[taskId] ||= []
    run.messages[taskId].push({ test: name, status: 'failed', details: err.message, err: err })
  }

  finishSuite()
}

const xdescribe = describe

function promise(p) {
  run.promises.push(p)
  return p
}

export { run }
`;
