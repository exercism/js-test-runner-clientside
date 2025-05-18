// const process = { env: { NODE_ENV: 'PRODUCTION' }, argv: [], version: "", cwd: () => ".", platform: '' };

import { generateOutput, type TestOutput } from "./output";
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
  slug: string,
  files: Record<string, string>,
  userPaths: string[],
  transpile: (code: string, type: "code" | "test") => string = (code) => code,
): Promise<TestOutput> {
  const config = readConfig<CustomJavaScriptConfig>(files);

  const userCodes = findUserCode(config, files, userPaths)
    .map((code) => transpile(code, "code"))
    .join("\n\n\n");

  const testCodes = findTestCode(config, files, userPaths)
    .map((code) => transpile(code, "test"))
    .join("\n\n\n");

  const runOptions = {
    enableTaskIds: Boolean(config.custom["flag.tests.task-per-describe"]),
  };

  const { tests, object } = prepareTest(testCodes, userCodes, slug, runOptions);

  // Set some globals
  const globals = globalThis as Record<string, any>;
  globals["expect"] = jestExpect;
  globals["jest"] = jest;

  let timer: undefined | NodeJS.Timeout;
  let interval: undefined | NodeJS.Timeout;

  function cleanup() {
    console.log("[suite] cleaning up run", tests, object);
    URL.revokeObjectURL(tests);
    URL.revokeObjectURL(object);

    clearInterval(interval);
    clearTimeout(timer);

    // Clear globals
    delete globals["expect"];
    delete globals["jest"];
  }

  const result = await import(/* webpackIgnore: true */ `${tests}`)
    .then<TestRun>((result) => {
      if (result.run.completed) {
        return result.run;
      }

      return new Promise<TestRun>((resolve, reject) => {
        timer = setTimeout(
          () => {
            clearInterval(interval);

            reject("Did not finish the tests within reasonable time");
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

  return generateOutput(result);
}

function prepareTest(
  tests: string,
  code: string,
  slug: string,
  options: { enableTaskIds: boolean } = { enableTaskIds: false },
) {
  const importableCode = esm`${code}`;

  const regexp = new RegExp(
    `\\./${slug}(?:\\.(?:ts|js|mjs|cjs|mts|cts|tsx|jsx))?`,
  );
  const lines = tests.replace(regexp, `${importableCode}`).split("\n");

  // Delete globals import
  lines.splice(
    lines.findIndex(
      (l) => l.indexOf("import ") !== -1 && l.indexOf("from '@jest/globals'"),
    ),
    1,
    "// import { ... } from '@jest/globals'",
  );

  // Add test helper
  lines.splice(
    lines.findIndex((l) => l.indexOf("from ") !== -1) + 1,
    0,
    TEST_HELPER,
  );

  return { tests: esm`${lines.join("\n")}`, object: importableCode };
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
  promises: [],
	result: null,
  completed: null
}

let failFast = true
let awaiting = 0

function startTest(name) {
  awaiting += 1
  console.debug("[test] "+ name)

  run.messages[run.taskId] ||= []
}

function passTest(name) {
  awaiting -= 1
  run.passed += 1

  run.messages[run.taskId].push({ test: name, status: 'passed' })
}

function failTest(name, err) {
  awaiting -= 1
  run.failed += 1
  run.messages[run.taskId].push({ test: name, status: 'failed', details: err.message, err: err })

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
}

async function test(name, c) {
  if (failFast && run.failed > 0) {
    skipTest()
    return
  }

  startTest(name)

  try {
    await c()
    passTest(name)
  } catch (err) {
    failTest(name, err)
  }
}

const xtest = test
const it = test
const xit = test

async function describe(name, c) {
  runSuite(name)
  try {
    await c()
    await Promise.all(run.promises)
  } catch (err) {
    run.messages[run.taskId].push({ test: name, status: 'failed', details: err.message, err: err })
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

/*
class AssertionFailed extends Error {
}

function eq(a, b, aStack = [], bStack = [], customTesters = []) {
  var result = true;

  if (a instanceof Error && b instanceof Error) {
    return a.message == b.message;
  }

  if (Object.is(a, b)) {
    return true;
  }
  // A strict comparison is necessary because \`null == undefined\`.
  if (a === null || b === null) {
    return a === b;
  }

  var className = Object.prototype.toString.call(a);
  if (className != Object.prototype.toString.call(b)) {
    return false;
  }

  switch (className) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      if (typeof a !== typeof b) {
        // One is a primitive, one a \`new Primitive()\`
        return false;
      } else if (typeof a !== 'object' && typeof b !== 'object') {
        // both are proper primitives
        return Object.is(a, b);
      } else {
        // both are \`new Primitive()\`s
        return Object.is(a.valueOf(), b.valueOf());
      }
    case '[object Date]':
      // Coerce dates to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of \`NaN\` are not equivalent.
      return +a == +b;
    // RegExps are compared by their source patterns and flags.
    case '[object RegExp]':
      return a.source === b.source && a.flags === b.flags;
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);
  var size = 0;
  // Recursively compare objects and arrays.
  // Compare array lengths to determine if a deep comparison is necessary.
  if (className == '[object Array]') {
    size = a.length;
    if (size !== b.length) {
      return false;
    }

    while (size--) {
      result = eq(a[size], b[size], aStack, bStack, hasKey);
      if (!result) {
        return false;
      }
    }
  }

  // Deep compare objects.
  var aKeys = keys(a, className == '[object Array]', hasKey),
    key;
  size = aKeys.length;

  // Ensure that both objects contain the same number of properties before comparing deep equality.
  if (keys(b, className == '[object Array]', hasKey).length !== size) {
    return false;
  }

  while (size--) {
    key = aKeys[size];

    // Deep compare each member
    result =
      hasKey(b, key) &&
      eq(a[key], b[key], aStack, bStack, customTesters, hasKey);

    if (!result) {
      return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();

  return result;
}

function keys(
  obj,
  isArray,
  hasKey
) {
  var allKeys = (function(o) {
    var keys = [];
    for (var key in o) {
      if (hasKey(o, key)) {
        keys.push(key);
      }
    }
    return keys.concat(
      (Object.getOwnPropertySymbols(o)).filter(
        symbol =>
          (Object.getOwnPropertyDescriptor(o, symbol))
            .enumerable,
      ),
    );
  })(obj);

  if (!isArray) {
    return allKeys;
  }

  var extraKeys = [];
  if (allKeys.length === 0) {
    return allKeys;
  }

  for (var x = 0; x < allKeys.length; x++) {
    if (typeof allKeys[x] === 'symbol' || !allKeys[x].match(/^[0-9]+$/)) {
      extraKeys.push(allKeys[x]);
    }
  }

  return extraKeys;
}

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function expect(value) {

  function promiseToBe(x) {
    return promise(
      value.then(
        (resolved) => {
          if (!eq(x, resolved)) {
            throw new AssertionFailed(\`Expected \${JSON.stringify(resolved, undefined, 2)} to be \${x}\`)
          }
        }
      )
    )
  }

  function toBe(x) {
    if (!eq(x, value)) {
      throw new AssertionFailed(\`Expected \${value} to be \${x}\`)
    }
  }

  return {
    resolves: {
      toBe: promiseToBe,
      toEqual: promiseToBe,
      toStrictEqual: promiseToBe
      toBeUndefined: toBeUndefined
    },
    rejects: {
      toThrow(x) {
        return promise(
          value.then(
            () => {
              throw new AssertionFailed(\`Expected error \${x}\`)
            },
            () => { }
          )
        )
      }
    },
    toBeCloseTo(x, y = 0.01) {
      if (Math.abs(value - x) <= y) {
        return true
      }

      throw new AssertionFailed(\`Expected \${value} to be close to \${x}\`)
    },
    toBe: toBe,
    toEqual: toBe,
    toStrictEqual: toBe,
    toBeUndefined:,
    toBeNull:,
    toThrow:,
    toBeInstanceOf:,
    toBeLessThanOrEqual:,
    toBeGreaterThanOrEqual:,
    toHaveLength:,
    toHaveBeenCalled:,
    toHaveBeenCalledTimes:,
    toHaveBeenCalledWith:,

    not: {
      toBe:,
      toEqual:,
      toThrow:,

      toHaveBeenCalled:
    }
  }
}

const jest = {
  fn: ...
}

export { run }
`;
*/
