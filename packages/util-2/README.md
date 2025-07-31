# util-2

typescript + webpack + typedoc 工具库脚手架

## 特性

- 使用 tsc 输出 `cjs` `es`
- 使用 webpack 输出合并后的 `umd` ，支持浏览器直接引入
- jest 测试
- typedoc 生成类型文档站点
- 支持 Tree-shaking

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
