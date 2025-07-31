/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const pkg = require('./package.json');

const { NODE_ENV } = process.env;

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const isProd = NODE_ENV === 'production';

const filename = isProd ? `${pkg.name}.min.js` : `${pkg.name}.js`;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'umd'),
    filename,
    library: {
      name: toCamel(pkg.name),
      type: 'umd',
      umdNamedDefine: true
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: require('./.babelrc.js')
        }
      }
    ]
  }
};
