import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import copy from "rollup-plugin-copy";

import postcss from "rollup-plugin-postcss";


export default [
  {
    input: "src/components/index.ts",
    output: [
      {
        file: "dist/components/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/components/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
      copy({
        targets: [
          { src: "src/templates/*", dest: "dist/templates" },
        ],
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/components/index.ts",
    output: [{ file: "dist/components/index.d.ts" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
  {
    input: "src/requests/index.ts",
    output: [
      {
        file: "dist/requests/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/requests/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: [],
  },
  {
    input: "src/requests/index.ts",
    output: [{ file: "dist/requests/index.d.ts" }],
    plugins: [dts.default()],
  },
  {
    input: "src/bin/index.ts",
    output: [
      {
        file: "dist/bin/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/bin/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: [], 
  }
];
