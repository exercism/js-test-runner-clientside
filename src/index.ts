import { generateOutput as generateJavaScriptOutput } from "./output";
import type {
  FailedTestRun,
  GenerateOutputFn,
  OutputOptions,
  TestRun,
  TranspileFn,
  OutputInterface,
} from "./types";
import { findLibCode, findTestCode, findUserCode, readConfig } from "./utils";

export type * from "./types";
export * from "./utils";

import jestExpect from "expect";
import jest from "jest-mock";

export function runTests(
  _slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal?: AbortSignal,
): Promise<OutputInterface>;
export function runTests(
  _slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal: AbortSignal,
  transpile: TranspileFn,
): Promise<OutputInterface>;
export function runTests(
  _slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal: AbortSignal,
  transpile: TranspileFn | undefined,
  generateOutput: GenerateOutputFn<OutputOptions>,
): Promise<OutputInterface>;

export async function runTests(
  _slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal?: AbortSignal,
  transpile: TranspileFn = (code) => code,
  generateOutput: GenerateOutputFn<OutputOptions> = generateJavaScriptOutput,
): Promise<OutputInterface> {
  return runJestTests({ files, userPaths }, signal, {
    transpile,
    generateOutput,
  }).catch((error: unknown) => {
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

async function runJestTests(
  solution: {
    files: Record<string, string>;
    userPaths: string[];
  },
  signal: undefined | AbortSignal,
  callbacks: {
    transpile: TranspileFn;
    generateOutput: GenerateOutputFn<OutputOptions>;
  },
) {
  const { files, userPaths } = solution;
  const { transpile, generateOutput } = callbacks;

  const config = readConfig(files);

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

  // Get all the library code (strip user submitted)
  const libraryCode = findLibCode(config, files, userPaths);
  for (const path in libraryCode) {
    libraryCode[path] = transpile(
      libraryCode[path],
      path.includes(".spec.") || path.includes(".test.") ? "test" : "code",
    );
  }

  const runOptions = {
    enableTaskIds: Boolean(
      config.custom && config.custom["flag.tests.task-per-describe"],
    ),
  };

  const { entry, urls } = prepareTest(
    { test: testCodes, user: userCodes, shared: libraryCode },
    runOptions,
  );

  // Set some globals
  const globals = globalThis as Record<string, any>;
  globals["expect"] = jestExpect;
  globals["jest"] = jest;

  const references: {
    timer: undefined | NodeJS.Timeout;
    interval: undefined | NodeJS.Timeout;
  } = {
    timer: undefined,
    interval: undefined,
  };

  function cleanup() {
    console.debug("[suite] cleaning up run", urls);
    urls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));

    clearInterval(references.interval);
    clearTimeout(references.timer);

    // Clear globals
    delete globals["expect"];
    delete globals["jest"];
  }

  if (signal) {
    if (signal.aborted) {
      throw new Error("Run was aborted before it could start");
    }
  }

  type ImportedTest = {
    run: TestRun;
  };

  const result = await import(/* webpackIgnore: true */ `${entry}`)
    .then<TestRun>((result: ImportedTest) => {
      if (result.run.completed) {
        return result.run;
      }

      const run = onCompletedRun(result.run, 100 * 10 * 30, references);
      const abort = onAbortRun(signal);

      return Promise.race([run, abort]);
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

function onCompletedRun(
  run: TestRun,
  timeout: number,
  references: {
    timer: undefined | NodeJS.Timeout;
    interval: undefined | NodeJS.Timeout;
  },
) {
  return new Promise<TestRun>((resolve, reject) => {
    references.timer = setTimeout(() => {
      clearInterval(references.interval);

      reject(new Error("Did not finish the tests within reasonable time"));
    }, timeout);

    references.interval = setInterval(() => {
      if (run.completed) {
        clearTimeout(references.timer);
        clearInterval(references.interval);

        resolve(run);
      }
    }, 100);
  });
}

function onAbortRun(signal: undefined | AbortSignal) {
  return new Promise<TestRun>((reject) => {
    if (!signal) {
      return;
    }

    signal.addEventListener(
      "abort",
      (_) => reject(signal.reason || "Run was aborted before it could finish"),
      {
        once: true,
      },
    );
  });
}

function makeImportReplaceMatcher(path: string) {
  const userPathParts = path.split("/");
  const fileName = userPathParts.pop() || "";
  const fileNameParts = fileName.split(".");
  fileNameParts.pop();

  const importName = [...userPathParts, fileNameParts.join(".")].join("/");

  return new RegExp(
    `\\./${importName}(?:\\.(?:ts|js|mjs|cjs|mts|cts|tsx|jsx))?`,
  );
}

function replaceImports(
  { from, to }: { from: string; to: string },
  ...collections: Record<string, string>[]
) {
  const matcher = makeImportReplaceMatcher(from);

  for (const collection of collections) {
    for (const key in collection) {
      collection[key] = collection[key].replace(matcher, `${to}`);
    }
  }
}

function prepareTest(
  {
    test,
    user,
    shared,
  }: {
    test: Record<string, string>;
    user: Record<string, string>;
    shared: Record<string, string>;
  },
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

  for (const sharedPath in shared) {
    const sharedCode = shared[sharedPath];
    const importableCode = esm`${sharedCode}`;
    urls.push(importableCode);

    // Shared files can be imported in tests, in shared files, and in user code
    replaceImports(
      { from: sharedPath, to: importableCode },
      user,
      test,
      shared,
    );
  }

  for (const userPath in user) {
    const userCode = `
import { log } from '${globalLogger}'

${user[userPath]}
  `;

    if (userCode.includes("module.exports = ")) {
      throw new Error(
        "You must use ESM export syntax. Remove all references to module.exports and exports.<...> from the code (including comments) to continue.",
      );
    }

    const importableCode = esm`${userCode}`;
    urls.push(importableCode);

    // User files can be imported in tests and in user code
    replaceImports({ from: userPath, to: importableCode }, user, test);
  }

  for (const testPath in test) {
    const lines = test[testPath].split("\n");

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

    // Test files cannot be imported by anything
    // replaceImports({ from: testPath, to: importableCode })
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
