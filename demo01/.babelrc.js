const pkg = require("./package.json");

const { MODULE_TYPE } = process.env;

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const plugins = [];

if (MODULE_TYPE === "umd") {
  plugins.push([
    "@babel/transform-modules-umd",
    {
      "globals": {
        "index": toCamel(pkg.name) // umd 全局变量名称
      },
      "exactGlobals": true
    }
  ]);
} else {
  if (MODULE_TYPE === "cjs") {
    plugins.push("@babel/transform-modules-commonjs");
  }
  plugins.push("@babel/transform-runtime");
}

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "modules": MODULE_TYPE !== "es" ? MODULE_TYPE : false,
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