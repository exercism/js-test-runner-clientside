import type { FailedTestRun, TestRun } from "./types";

export type TestOutput = {};

export function generateOutput(testRun: TestRun | FailedTestRun): TestOutput {
  return {};
}
