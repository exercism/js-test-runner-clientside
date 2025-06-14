import type { FailedTestRun, TestRun } from "./types";

export function workerize(
  onWorker: (worker: Worker) => Promise<TestRun | FailedTestRun>,
  onInline: () => Promise<TestRun | FailedTestRun>,
): Promise<TestRun | FailedTestRun> {
  if (supportsWorkerType()) {
    return onWorker(makeWorker());
  }

  return onInline();
}

function makeWorker() {
  return new Worker("./javascript-browser-test-runner-worker.mjs", {
    type: "module",
  });
}

let __supportsModuleWorkers = { result: undefined as undefined | boolean };

function supportsWorkerType() {
  if (__supportsModuleWorkers.result !== undefined) {
    return __supportsModuleWorkers.result;
  }

  if (!window.Worker) {
    return (__supportsModuleWorkers.result = false);
  }

  const tester = {
    get type() {
      __supportsModuleWorkers.result = true;
      return "module" as const;
    }, // it's been called, it's supported
  };

  try {
    // We use "data:" as url to avoid an useless network request. This will
    // either throw in Chrome, or fire an error event in Firefox, which is
    // perfect since we don't need the worker to actually start.
    //
    // Checking for the type of the script is done before trying to load it.
    new Worker("data:", tester).terminate();
  } catch {
    __supportsModuleWorkers.result = false;
  } finally {
    return Boolean(__supportsModuleWorkers.result);
  }
}
