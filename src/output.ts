import type { FailedTestRun, TestResult, TestRun } from "./types";

export interface OutputInterface {
  status: "fail" | "pass" | "error";
  message: string;
  tests: OutputTestInterface[];
  version: 1 | 3;
}

interface OutputTestInterface {
  name: string;
  status: "fail" | "pass" | "error";
  message: string;
  output: string | null;
  test_code: string;
  task_id?: number;
}

type ExerciseConfig = {
  custom?: {
    "version.tests.compatibility"?: "jest-27" | "jest-29";
    "flag.tests.task-per-describe": boolean;
    "flag.tests.may-run-long": boolean;
    "flag.tests.includes-optional": boolean;
  };
};

export function generateOutput(
  testRun: TestRun | FailedTestRun,
  options: ExerciseConfig["custom"],
): OutputInterface {
  if (!("completed" in testRun)) {
    return {
      status: "error",
      message: testRun.message,
      tests: [],
      version: 1,
    };
  }

  const status = testRun.failed === 0 ? "pass" : "fail";
  if (status === "pass" && testRun.passed === 0) {
    return {
      status: "fail",
      message:
        "Expected to run at least one test, but none were found. This can " +
        "happen if the test file(s) (.spec.js) are missing or empty. " +
        "These files are normally not empty. Revert any changes or report " +
        "an issue if the problem persists.",
      tests: [],
      version: 1,
    };
  }

  if (status === "pass" && testRun.skipped !== 0) {
    if (options && !options["flag.tests.includes-optional"]) {
      return {
        status: "fail",
        message:
          "Expected to see 0 skipped tests and 0 skipped test suites. " +
          "None of the tests in this exercise are optional. The skipped " +
          "tests will not show up, but were found during the last run.",
        tests: [],
        version: 1,
      };
    }
  }

  const testResults: OutputTestInterface[] = [];

  for (let taskId = 1; taskId < testRun.messages.length; taskId++) {
    if (taskId === 0) {
      continue;
    }

    const messages = testRun.messages[taskId] || [];
    messages.forEach((testResult) => {
      const message = (testResult.details || "").split("\n");
      const testCode = message[0].startsWith("expect(")
        ? message.shift() || ""
        : "";

      testResults.push({
        name: testResult.test,
        status: testResult.status === "passed" ? "pass" : "fail",
        message: output(message),
        output: output(testRun.logs[taskId]),
        test_code: testCode,
        task_id:
          options && options["flag.tests.task-per-describe"]
            ? taskId
            : undefined,
      });
    });
  }

  return {
    status,
    message: output(testRun.logs[0]),
    tests: testResults,
    version: 3,
  };
}

function output(raw: string[] | null | undefined) {
  const message = ((raw || []).join("\n") || "").trim();
  if (message.length <= 500) {
    return message;
  } else {
    return message
      .slice(0, 500 - "... (500 chars max)".length)
      .concat("... (500 chars max)");
  }
}
