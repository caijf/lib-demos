import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const globalVarName = 'demo03';

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      format: "umd",
      file: `umd/${globalVarName}.js`,
      exports: 'named',
      name: globalVarName,
      sourcemap: true
    },
    {
      format: "umd",
      file: `umd/${globalVarName}.min.js`,
      exports: 'named',
      name: globalVarName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
});