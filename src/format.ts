/**
 * The global that holds the formatter for console messages. The logger in
 * prepare.ts reads it, so each message looks as it does in Node's console.
 */
export const FORMAT = Symbol.for(
  "exercism.javascript-browser-test-runner.format",
);
