globalThis.process = globalThis.process || {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  browser: true,
  argv: [],
  version: "",
  cwd: () => ".",
  platform: "",
};
