const path = require("path");
const pkg = require("./package.json");

const { NODE_ENV } = process.env;

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const isProd = NODE_ENV === "production";

const filename = isProd ? `${pkg.name}.min.js` : `${pkg.name}.js`;
const devtool = isProd ? 'source-map' : 'eval-source-map';

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "umd"),
    filename,
    library: {
      name: toCamel(pkg.name),
      type: "umd",
      umdNamedDefine: true
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", "tsx", ".mjs", ".json"]
  },
  devtool,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      }
    ]
  }
}