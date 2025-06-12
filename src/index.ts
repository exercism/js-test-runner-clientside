import { generateOutput as generateJavaScriptOutput } from "./output";
import { prepare } from "./prepare";
import type {
  FailedTestRun,
  GenerateOutputFn,
  OutputInterface,
  OutputOptions,
  TestRun,
  TranspileFn,
} from "./types";
import { findCode, readConfig } from "./utils";

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
    readonly files: Readonly<Record<string, string>>;
    readonly userPaths: readonly string[];
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
  const code = findCode(config, files, userPaths, transpile);

  const runOptions = {
    enableTaskIds: Boolean(
      config.custom && config.custom["flag.tests.task-per-describe"],
    ),
  };

  const { entry, urls } = prepare(code, runOptions);

  // Set some globals
  const globals = globalThis as Record<string, any>;
  globals["expect"] = jestExpect;
  globals["jest"] = jest;

  // Keep references so they can be cleaned up
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

  // Bail early if dead-on-arrival
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

/**
 * Promise that resolves when the run completes or a timeout is reached
 *
 * @param run the live object with the run. This is usually an exported binding
 * @param timeout the number of milliseconds these tests are allowed to run
 * @param references object to track interval and timeout so they can be cleared
 *
 * @returns promise that resolves on completion or rejects on timeout
 */
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

/**
 * Promise that rejects when the signal receives an abort event
 *
 * @param signal the signal
 * @returns promise that rejects when signal is aborted
 */
function onAbortRun(signal: undefined | AbortSignal) {
  return new Promise<TestRun>((reject) => {
    if (!signal) {
      return;
    }

    if (signal.aborted) {
      return reject(signal.reason || "Run was aborted before it could finish");
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
