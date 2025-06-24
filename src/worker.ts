import jestExpect from "expect";
import jest from "jest-mock";

// Set some globals
const globals = globalThis as Record<string, any>;
globals["expect"] = jestExpect;
globals["jest"] = jest;

onmessage = function (event) {
  const { entry, timeout } = event.data;
  console.debug(`[test-worker] running ${entry} for a maximum of ${timeout}s`);

  let timer: undefined | NodeJS.Timeout;
  let interval: undefined | NodeJS.Timeout;

  import(entry).then(
    ({ run }) => {
      if (run.completed) {
        console.debug("[test-worker] completed right away");
        postMessage(JSON.parse(JSON.stringify(run)));
      }

      const references = {
        timer: undefined as undefined | NodeJS.Timeout,
        interval: undefined as undefined | NodeJS.Timeout,
      };

      references.timer = setTimeout(() => {
        clearInterval(references.interval);

        throw new Error("Did not finish the tests within reasonable time");
      }, timeout * 1000);

      references.interval = setInterval(() => {
        if (run.completed) {
          clearTimeout(references.timer);
          clearInterval(references.interval);

          console.debug("[test-worker] completed all tests");
          postMessage(JSON.parse(JSON.stringify(run)));
        }
      }, 16);
    },
    (error) => {
      debugger;
      console.error(`[test-worker] ${error}`);
      throw new Error(
        "Could not start test runner because import of entry failed.",
      );
    },
  );
};
