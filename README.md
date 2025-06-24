# @exercism/javascript-browser-test-runner

When using this package, don't forget to serve `javascript-browser-test-runner-worker.mjs` (and optionally `javascript-browser-test-runner-worker.mjs.map`) from the `output` folder on a baseUrl relative path to where you run the test runner.
You can change this path by providing `globalThis.__exercism.workers.javascript = 'url'` (`globalThis` is `window` in main thread browser windows).

## Build

```
yarn build
```

Copy `imported.mjs` to `sample` to run the sample.

## Run sample

```
npx serve sample
```

## Release

Don't forget to update `package.json` version.

```
npm publish --access public
```
