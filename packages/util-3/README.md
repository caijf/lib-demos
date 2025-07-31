# util-3

typescript + rollup + typedoc 工具库脚手架

## 特性

- 使用 tsc 输出 `cjs` `es`
- 使用 rollup 输出合并后的 `umd` ，支持浏览器直接引入
- jest 测试
- typedoc 生成类型文档站点
- 支持 Tree-shaking

### tsc 和 rollup 对比

1. 如果是单模块使用 `export default` 默认导出

- tsc 导出 `exports.default = xxx`
- rollup 导出 `module.exports = xxx`

2. 如果需要添加自定义变量

- tsc 不支持
- rollup 支持，通过 `@rollup/plugin-replace` 实现

很多时候，都是使用 rollup 输出 `es` `cjs` `umd` ， 再使用 tsc 输出类型。

### Tree-shaking 说明

`package.json` 中加入 `module` `sideEffects` ，在生产环境构建时将启用 Tree-shaking 特性，减少包体积。

```json
  "module": "es/index.js", // webpack resolve.mainfields 主入口默认为 ['browser', 'module', 'main']
  "sideEffects": false, // 标识副作用的文件，让 webpack 不要去除
```

## 参考

- [tsconfig](https://www.staging-typescript.org/zh/tsconfig)
- [jest](https://facebook.github.io/jest/)
- [typedoc](http://typedoc.org/)
- [深入浅出 sideEffects](https://github.com/happylindz/blog/issues/15)
