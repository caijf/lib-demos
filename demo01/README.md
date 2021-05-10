# demo01

> 参考项目 [util-helpers](https://github.com/doly-dev/util-helpers)。

适用于使用 es6 开发的工具库。

## 特性

- 使用 babel 将 es6 转 es5，构建 `umd` `esm` 格式。
- 使用 webpack 输出 `dist/*` 支持浏览器直接引入。
- 支持 Tree-shaking

### Tree-shaking

`package.json` 中加入 `module` `sideEffects` ，在生产环境构建时将启用 Tree-shaking 特性，减少包体积。

```json
  "module": "es/index.js",
  "sideEffects": false,
```

## 缺陷

如果要支持 typescript 检测和提示，需要手动编写 \*.d.ts ，比较麻烦。

## 推荐集成

- [tsconfig](https://www.staging-typescript.org/zh/tsconfig)
- [jest](https://facebook.github.io/jest/)
- [jsdoc](https://jsdoc.app/)
