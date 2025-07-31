/* eslint-disable @typescript-eslint/no-require-imports */
// ref: https://my.oschina.net/linsk1998/blog/5593389
// ref: https://babeljs.io/docs/babel-plugin-transform-runtime#version
const babelRuntimePath = require.resolve('@babel/runtime/package.json', {
  paths: [process.cwd()]
});
const babelRuntimePackage = require(babelRuntimePath);
const babelRuntimeVersion = babelRuntimePackage.version;

const { MODULE_TYPE } = process.env;

const plugins = [];

if (MODULE_TYPE === 'cjs') {
  plugins.push('@babel/transform-modules-commonjs');
}

if (MODULE_TYPE !== 'umd') {
  plugins.push([
    '@babel/transform-runtime',
    {
      version: babelRuntimeVersion
    }
  ]);
}

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: MODULE_TYPE === 'es' ? false : 'auto',
        targets: ['> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      }
    ]
  ],
  plugins
};
