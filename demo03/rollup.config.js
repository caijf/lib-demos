import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const globalVarName = toCamel(pkg.name);

export default {
  input: "src/index.ts",
  output: [
    {
      format: "umd",
      file: `umd/${globalVarName}${isProduction ? ".min" : ""}.js`,
      name: globalVarName,
      sourcemap: isProduction ? true : "inline"
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    isProduction && terser()
  ]
}
