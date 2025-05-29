import { build } from "esbuild";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import { mockFsPlugin } from "./build/mock-fs.mjs";

await Promise.all([
  build({
    inject: ["./build/process-shim.js"],
    entryPoints: ["src/index.ts"],
    outfile: "output/imported.mjs",
    bundle: true,
    platform: "browser",
    target: browserslistToEsbuild(),
    format: "esm",
    plugins: [
      nodeModulesPolyfillPlugin({
        globals: {
          process: true,
          Buffer: true,
        },
      }),
      mockFsPlugin,
    ],
    sourcemap: true,
    keepNames: true,
    minify: true,
  }),
  build({
    inject: ["./build/process-shim.js"],
    entryPoints: ["src/index.ts"],
    outfile: "output/required.cjs",
    bundle: true,
    platform: "browser",
    target: browserslistToEsbuild(),
    format: "cjs",
    plugins: [
      nodeModulesPolyfillPlugin({
        globals: {
          process: true,
          Buffer: true,
        },
      }),
      mockFsPlugin,
    ],
    sourcemap: true,
    keepNames: true,
    minify: true,
  }),
  build({
    inject: ["./build/process-shim.js"],
    entryPoints: ["src/index.ts"],
    outfile: "output/fallback.js",
    bundle: true,
    platform: "browser",
    target: browserslistToEsbuild(),
    format: "iife",
    plugins: [
      nodeModulesPolyfillPlugin({
        globals: {
          process: true,
          Buffer: true,
        },
      }),
      mockFsPlugin,
    ],
    sourcemap: true,
    keepNames: true,
    minify: true,
  }),
]);
