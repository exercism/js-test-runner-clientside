import { parse } from "acorn";
import type { Node } from "acorn";
import type {
  FailedTestRun,
  TestRun,
  OutputOptions,
  OutputInterface,
  OutputTestInterface,
} from "./types";

export async function generateOutput(
  testRun: TestRun | FailedTestRun,
  options: OutputOptions | undefined,
): Promise<OutputInterface> {
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

      testResults.push({
        name: testResult.test,
        status: testResult.status === "passed" ? "pass" : "fail",
        message: output(message),
        output: output(testResult.logs) || null,
        test_code: testCode(testResult.code),
        task_id:
          options && options["flag.tests.task-per-describe"]
            ? taskId
            : undefined,
      });
    });
  }

  // As in the server runner, the logs written outside a test show with the
  // first failed test, or with the last test if every test passed.
  const globalOutput = output(testRun.logs);
  const failedIndex = testResults.findIndex((test) => test.status === "fail");
  const globalTest =
    testResults[failedIndex === -1 ? testResults.length - 1 : failedIndex];

  if (globalOutput && globalTest) {
    globalTest.output = [globalOutput, globalTest.output]
      .filter(Boolean)
      .join("\n");
  }

  return {
    status,
    message: globalTest ? "" : globalOutput,
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

/**
 * Gives the code of a test, as the server runner does: the statements in the
 * test function's body, each on its own line, or the expression that an arrow
 * function returns. It gives null if the test function can't be parsed.
 */
export function testCode(source: string | undefined): string | null {
  if (!source) {
    return null;
  }

  const wrapped = `(${source})`;
  const text = (node: Node) => wrapped.substring(node.start, node.end);

  try {
    const program = parse(wrapped, {
      ecmaVersion: "latest",
      sourceType: "module",
    });
    const [statement] = program.body;

    if (program.body.length !== 1 || statement.type !== "ExpressionStatement") {
      return null;
    }

    const fn = statement.expression;
    if (
      fn.type !== "ArrowFunctionExpression" &&
      fn.type !== "FunctionExpression"
    ) {
      return null;
    }

    if (fn.body.type === "BlockStatement") {
      return fn.body.body.map(text).join("\n");
    }

    return text(fn.body);
  } catch {
    return null;
  }
}
