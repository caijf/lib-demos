const { MODULE_TYPE } = process.env;

const plugins = [];

if (MODULE_TYPE === "cjs") {
  plugins.push("@babel/transform-modules-commonjs");
}

if (MODULE_TYPE !== "umd") {
  plugins.push("@babel/transform-runtime");
}

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "modules": MODULE_TYPE === "es" ? false : "auto",
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