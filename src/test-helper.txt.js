const run = {
  taskId: 0,
  failed: 0,
  skipped: 0,
  passed: 0,
  messages: [],
  logs: [],
  current: Promise.resolve(),
  result: null,
  completed: null,
};

/**
 * While a test function runs, its logs go to that test. Every other log, such
 * as one written when the solution file loads or in a hook, goes to run.logs.
 * The server runner does the same.
 */
let testLogs = null;

function log(type, message) {
  (testLogs ?? run.logs).push(`[${type}] ${message}`);
}

const removeLogListener = addLogListener(log);

let failFast = true;
let awaiting = 0;

/**
 * Each describe block is a suite. The root suite holds the tests and hooks
 * outside any describe block. A suite's taskId is the number of its top-level
 * describe block, as the server runner counts it.
 */
function makeSuite(name, parent) {
  return {
    name,
    parent,
    taskId: parent ? parent.taskId : 0,
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: [],
    started: false,
    beforeAllFailed: false,
    beforeAllError: undefined,
  };
}

const rootSuite = makeSuite(null, null);
let currentSuite = rootSuite;

/** The suites from the root suite down to this one. */
function suitesOf(suite) {
  const suites = [];
  for (let s = suite; s; s = s.parent) {
    suites.unshift(s);
  }
  return suites;
}

/** The name of a test, with its describe blocks: "twoFer() > no name given". */
function fullName(suite, name) {
  return suitesOf(suite)
    .slice(1)
    .map((s) => s.name)
    .concat(name === undefined ? [] : [name])
    .join(" > ");
}

/** Adds a step to the queue. The steps run one at a time, in order. */
function enqueue(step) {
  run.current = run.current.then(step).catch((err) => {
    originalConsole.error("[test] failed to run a step \n", err);
  });
}

function startTest(taskId, name) {
  originalConsole.debug(`[test (${taskId})]:start ${name}`);

  run.messages[taskId] ||= [];
}

function passTest(taskId, name, logs = [], code) {
  run.passed += 1;
  originalConsole.debug(`[test (${taskId})]:pass ${name}`);

  run.messages[taskId] ||= [];
  run.messages[taskId].push({ test: name, status: "passed", logs, code });
}

function failTest(taskId, name, err, logs = [], code) {
  run.failed += 1;
  originalConsole.debug(`[test (${taskId})]:fail ${name}`);

  run.messages[taskId] ||= [];
  run.messages[taskId].push({
    test: name,
    status: "failed",
    details: err && err.message,
    err: err,
    logs,
    code,
  });

  globalThis.lastErr = err;

  if (err && err.constructor.name === "JestAssertionError") {
    originalConsole.error(`[test] failed assertion of ${name}.\n`, err.message);
  } else if (err instanceof SyntaxError) {
    failFast = true;
    originalConsole.error(`[test] syntax is not valid JavaScript \n`, err);
  } else {
    originalConsole.error(`[test] failed to run ${name} \n`, err);
  }
}

function skipTest() {
  run.skipped += 1;
}

function runSuite(name) {
  originalConsole.debug("[suite] " + name);
  awaiting += 1;
}

function finishSuite() {
  awaiting -= 1;
  if (awaiting > 0) {
    return originalConsole.debug(`[suite] still running, awaiting ${awaiting}`);
  }

  run.result = run.failed === 0 ? "passed" : "failed";
  run.completed = true;

  removeLogListener();
}

function beforeEach(fn) {
  currentSuite.beforeEach.push(fn);
}

function afterEach(fn) {
  currentSuite.afterEach.push(fn);
}

function beforeAll(fn) {
  currentSuite.beforeAll.push(fn);
}

function afterAll(fn) {
  currentSuite.afterAll.push(fn);
}

/**
 * Runs the suite's beforeAll functions before its first test, as Jest does.
 * If one of them fails, every test in the suite fails with its error.
 */
async function startSuite(suite) {
  if (!suite.started) {
    suite.started = true;

    try {
      for (const fn of suite.beforeAll) {
        await fn();
      }
    } catch (err) {
      suite.beforeAllFailed = true;
      suite.beforeAllError = err;
    }
  }

  if (suite.beforeAllFailed) {
    throw suite.beforeAllError;
  }
}

/** Runs the suite's afterAll functions, if any of its tests ran. */
async function endSuite(suite) {
  if (!suite.started) {
    return;
  }

  for (const fn of suite.afterAll) {
    try {
      await fn();
    } catch (err) {
      failTest(suite.taskId, fullName(suite, "afterAll"), err);
    }
  }
}

function test(name, c) {
  const suite = currentSuite;

  enqueue(() => queueTest(name, c, suite));
}

test.skip = skipTest;

const xtest = test;
const it = test;
const xit = test;

function describe(name, c) {
  const parent = currentSuite;
  const suite = makeSuite(name, parent);

  if (parent === rootSuite) {
    run.taskId += 1;
    suite.taskId = run.taskId;
  }

  runSuite(name);

  // The describe block's function adds its tests and hooks to the suite.
  currentSuite = suite;
  try {
    c();
  } catch (err) {
    run.messages[suite.taskId] ||= [];
    run.messages[suite.taskId].push({
      test: fullName(suite),
      status: "failed",
      details: err.message,
      err: err,
    });
    run.failed += 1;
  } finally {
    currentSuite = parent;
  }

  // This step runs after every test in the suite.
  enqueue(async () => {
    await endSuite(suite);

    if (awaiting === 1) {
      await endSuite(rootSuite);
    }

    finishSuite();
  });
}

describe.skip = (name, _c) => {
  throw new Error(
    "An entire test section (describe block) is skipped, which is not supported.",
  );
};

const xdescribe = describe;

/**
 * Runs a test with the hooks of every describe block around it, in Jest's
 * order: beforeAll and beforeEach from the outside in, then the test, then
 * afterEach from the inside out.
 */
async function queueTest(name, c, suite) {
  const taskId = suite.taskId;
  const testName = fullName(suite, name);

  originalConsole.debug(`[start] ${testName} (task ${taskId})`);

  if (failFast && run.failed > 0) {
    skipTest();
    return;
  }

  startTest(taskId, testName);

  const suites = suitesOf(suite);
  const logs = [];
  let failed = false;
  let error;

  function fail(err) {
    if (!failed) {
      failed = true;
      error = err;
    }
  }

  try {
    for (const s of suites) {
      await startSuite(s);
    }

    for (const s of suites) {
      for (const fn of s.beforeEach) {
        await fn();
      }
    }

    testLogs = logs;
    try {
      await c();
    } finally {
      testLogs = null;
    }
  } catch (err) {
    fail(err);
  }

  for (const s of suites.slice().reverse()) {
    for (const fn of s.afterEach) {
      try {
        await fn();
      } catch (err) {
        fail(err);
      }
    }
  }

  // The source of the test function, from which the output takes its code.
  const code = typeof c === "function" ? c.toString() : undefined;

  if (failed) {
    failTest(taskId, testName, error, logs, code);
  } else {
    passTest(taskId, testName, logs, code);
  }

  originalConsole.debug(`[end] ${testName} (task ${taskId})`);
}

if (typeof jest !== "undefined") {
  jest.mock = function mock(_moduleName, mocker) {
    const mocked = mocker();

    Object.entries(mocked).forEach(([key, value]) => {
      globalThis[key] = value;
      originalConsole.debug(`[mocked] ${key} from ${_moduleName}`);
    });
  };
}

export { run };
