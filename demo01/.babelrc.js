const pkg = require("./package.json");

const { MODULE_TYPE } = process.env;

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/(-)(.{1})/g, ($0, $1, $2) => {
    return /[a-z]/.test($2) ? $2.toUpperCase() : $2;
  });
}

const babelEnvModulesConfig = MODULE_TYPE === "esm" ? { modules: false } : {};
const plugins = [];

if (MODULE_TYPE !== "esm") {
  plugins.push([
    "@babel/transform-modules-umd",
    {
      "globals": {
        "index": toCamel(pkg.name) // umd 全局变量名称
      },
      "exactGlobals": true
    }
  ]);
}

if (MODULE_TYPE !== "global") {
  plugins.push("@babel/transform-runtime");
}

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        ...babelEnvModulesConfig,
        "targets": [
          "> 1%",
          "last 4 versions",
          "Firefox ESR",
          "not ie < 9"
        ]
      }
    ]
  ],
  plugins
}