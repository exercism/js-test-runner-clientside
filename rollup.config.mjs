import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "src/index.ts",
  output: {
    dir: "output",
    format: "es",
  },
  plugins: [
    typescript({ module: "ESNext" }),
    nodeResolve(),
    commonjs(),
    json(),
    nodePolyfills(),
  ],
  external: [],
};
