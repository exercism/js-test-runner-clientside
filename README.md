```
yarn rollup -c
```

Then in `output/index.js` add at the top:

```javascript
const process = {
  env: { NODE_ENV: "PRODUCTION" },
  argv: [],
  version: "",
  cwd: () => ".",
  platform: "",
};
```

And search for `const builtInObject = [`, replace `Buffer` with `Buffer$1`.
