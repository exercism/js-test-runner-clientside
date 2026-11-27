# @exercism/javascript-browser-test-runner

When using this package, don't forget to serve `javascript-browser-test-runner-worker.mjs` (and optionally `javascript-browser-test-runner-worker.mjs.map`) from the `output` folder on a baseUrl relative path to where you run the test runner.
You can change this path by providing `globalThis.__exercism.workers.javascript = 'url'` (`globalThis` is `window` in main thread browser windows).

## Build

```
yarn build
```

Copy `imported.mjs` to `sample` to run the sample.

## Test

```
yarn playwright install chromium-headless-shell
yarn test
```

`yarn test` builds the runner, then runs every fixture in `test/fixtures` in headless Chromium, once in a worker and once on the main thread.
It compares each result with the snapshot in the fixture's folder (`expected_clientside_results.worker.json` and `expected_clientside_results.main-thread.json`).
The fixtures come from [exercism/javascript-test-runner](https://github.com/exercism/javascript-test-runner/tree/main/test/fixtures), and `expected_results.json` holds that runner's result.
To rewrite the snapshots after a change to the runner, run `yarn test:update`.

## Run sample

```
npx serve sample
```

## Release

Don't forget to update `package.json` version.

```
npm publish --access public
```
