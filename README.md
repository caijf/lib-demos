# lib-demos

常见的前端开源项目演示

- [util-1](./packages/util-1) - babel + webpack + jsdoc 工具库
- [util-2](./packages/util-2) - typescript + webpack + typedoc 工具库
- [util-3](./packages/util-3) - typescript + rollup + typedoc 工具库
- [react-component-1](./packages/react-component-1) - father-build + dumi 组件库
- [static-1](./packages/static-1) - gulp 处理 html、js、css、image 等静态资源打包

## 前端规范相关工具集成

这些工具可以使开发体验更友好，更规范！

[点击查看文档](./standard.md)

- [eslint] - JavaScript 代码检查
- [stylelint] - CSS 检查
- [prettier] - 代码格式化
- [lint-staged] - 在 git 暂存文件上运行 linters 的工具
- [commitlint] - git commit 提交信息校验

## 相关工具推荐

### compile & build

- [babel] - 用于将 es2015+ 语法代码转换为向后兼容的 JavaScript 语法
- [typescript] - 在 JavaScript 的基础上增加了静态类型检查的超集
- [gulp] - 基于流（Stream）的自动化构建工具
- [webpack] - 主要是将 JavaScript 文件打包在一起，也能够转换、打包或包裹任何资源
- [vite] - 现代化的前端构建工具，利用浏览器原生 ES 模块支持，提供快速的开发体验
- [father] - NPM 包研发工具，用于生成构建产物（es/cjs/umd）
- [tsdx] - 简化 TypeScript 库开发的零配置工具【长期不维护】

### test

- [jest] - JavaScript 测试框架
- [vitest] - 原生支持 Vite 的测试框架
- [tinybench] - 轻量级基准测试库
- [testing-library] - 单元测试库，还支持 DOM 测试、React Hook 测试
- [cypress] - 端到端自动化测试

### monorepo

- [turborepo] - 高性能构建系统，专为 monorepo 而设计
- [lerna] - 优化使用 git 和 npm 管理多包存储库工作流的工具

### doc

- [jsdoc] - 用于 JavaScript 的 API 文档生成器
- [dumi] - 为组件研发而生的静态站点框架
- [docusaurus] - 基于 React 框架的静态站点生成器
- [storybook] - 用于独立开发 React、Vue 和 Angular 的 UI 组件
- [vuepress] - vue 驱动的网站生成器
- [vitepress] - 由 Vite 和 Vue 驱动的静态站点生成器
- [typedoc] - 将 TypeScript 源码中的注释转换为 HTML 格式的文档

## TODO

CI/CD、Jenkins、github action

[eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[prettier]: https://prettier.io/
[lint-staged]: https://www.npmjs.com/package/lint-staged
[commitlint]: https://commitlint.js.org/
[babel]: https://babeljs.io/
[typescript]: https://www.typescriptlang.org/
[gulp]: https://gulpjs.com/
[webpack]: https://webpack.js.org/
[tsdx]: https://github.com/formium/tsdx
[father]: https://github.com/umijs/father
[vite]: https://vite.dev/
[jsdoc]: https://jsdoc.app/
[typedoc]: http://typedoc.org/
[dumi]: https://d.umijs.org/
[docusaurus]: https://www.docusaurus.cn/
[vitepress]: https://vitepress.dev/
[vuepress]: https://vuepress.vuejs.org/zh/
[storybook]: https://storybook.js.org/
[jest]: https://jestjs.io/
[vitest]: https://vitest.dev/
[tinybench]: https://www.npmjs.com/package/tinybench
[testing-library]: https://testing-library.com/
[cypress]: https://www.cypress.io/
[turborepo]: https://turborepo.com/
[lerna]: https://lerna.js.org/
