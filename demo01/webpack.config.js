const path = require("path");
const parseArgs = require("minimist");
const pkg = require("./package.json");

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/(-)(.{1})/g, ($0, $1, $2) => {
    return /[a-z]/.test($2) ? $2.toUpperCase() : $2;
  });
}

const cmdArgs = parseArgs(process.argv.slice(2));

const isProd = cmdArgs.mode === "production";

const filename = isProd ? `${pkg.name}.min.js` : `${pkg.name}.js`;
const devtool = isProd ? 'source-map' : 'eval-source-map';

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename,
    library: {
      name: toCamel(pkg.name),
      type: "umd",
      umdNamedDefine: true
    }
  },
  devtool,
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: require("./.babelrc.js")
        }
      }
    ]
  }
}