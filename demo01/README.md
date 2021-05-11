# demo01

babel + webpack 开发的工具库

## 特性

- 使用 babel 输出 `umd` `esm`
- 使用 webpack 输出合并后的 `umd` ，支持浏览器直接引入
- 该库本身开发没有 Tree-shaking，但是支持外部使用 Tree-shaking

### Tree-shaking 说明

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
