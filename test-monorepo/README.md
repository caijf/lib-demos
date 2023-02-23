# test-monorepo

monorepo(monolithic repository)是一种项目架构，简单的来说：一个仓库内包含多个开发项目(模块、包)。

## 多代码库的痛点

- 资源浪费：一个主干，多 repo 的方式，可能 node_module 会出现大量的冗余，比如它们可能都会安装 React、React-dom 等包，浪费了大量存储空间
- 调试繁琐：很多公共的包通过 npm 安装，想要调试依赖的包时，需要通过 npm link 的方式进行调试
- 资源包升级问题：一个项目依赖了多个 npm 包，当某一个子 npm 包代码修改升级时，都要对主干项目包进行升级修改。(这个问题感觉是最烦的，可能一个版本号就要去更新一下代码并发布)

## 相关工具

- [lerna](https://www.npmjs.com/package/lerna) - JavaScript 的单一代码库管理器，用来优化托管在 git\npm 上的多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。
- [turborepo](https://www.npmjs.com/package/turbo) - 用于 JavaScript 和 TypeScript 代码库的高性能构建系统。
- [nx](https://www.npmjs.com/package/nx) - 致力于新一代的智能化、可扩展的构建框架
- [rush](https://www.npmjs.com/package/@microsoft/rush) - 一个可扩展的 web 单仓库管理器

---

workspace 用一个命令在多个地方安装和更新 Node.js 的依赖项。

- [yarn](https://www.npmjs.com/package/yarn)
- [Pnpm](https://www.npmjs.com/package/pnpm)

## 快速上手

> 使用 yarn + lerna

### 初始化 `lerna`

```shell
mkdir lerna-demo && cd lerna-demo
npx lerna init
yarn install
```

### 配置 `yarn workspace`

> - yarn workspace 允许我们使用 monorepo 的形式来管理项目
> - 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面，而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
> - 整个项目只有根目录下面会有一份 yarn.lock 文件。子项目也会被 link 到 node_modules 里面，这样就允许我们就可以直接用 import 导入对应的项目

由于依赖提升，所以要注意 [幽灵依赖](https://rushjs.io/zh-cn/pages/advanced/phantom_deps/) 问题，建议改用 `pnpm` 包管理工具，它也支持 `workspace` 。

```diff
# lerna.json

{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
+  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "0.0.0"
}
```

### 创建子项目

```shell
lerna create mod-a
```

### 子项目添加依赖

```shell
lerna add react --scope=mod-a

# or

yarn workspace mod-a add react
```

### 添加根目录（公用）依赖

```shell
lerna add eslint

# or

yarn add eslint --ignore-workspace-root-check --dev
# yarn add eslint -W -D
```

### 执行子项目脚本

```diff
# package.json

+  "scripts": {
+    "test:a": "lerna exec --scope mod-a -- yarn test"
+  }
```

### 依赖其他子项目

子项目志杰可以建立连接，当修改 `mod-b` 包的源代码时，`mod-a` 的 `node_modules` 中饮用的 `mod-b` 包也会相应修改。

```shell
lerna add mod-b --scope=mod-a # mod-a 添加依赖 mod-b
```

### 发布子项目

## 更多命令

- lerna

```shell
lerna bootstrap # 将本地包链接在一起并安装剩余的包依赖项
lerna bootstrap --scope=package # 安装某个包的依赖
lerna bootstrap --hoist eslint # 提升公共包到根依赖
lerna clean # 删除所有依赖
lerna clean --scope=package # 删除某个包的依赖
lerna list # 查看包
lerna create <name> [loc] # 创建一个包，name包名，loc位置可选
```

- yarn workspace

```shell
# yarn workspace [package] [command]
yarn workspace mod-a add react # mod-a 安装依赖

yarn workspaces info # 查看工作空间包信息
```

## 参考

- [使用 Lerna & Yarn Workspaces 构建 mono-repo 项目](https://zhuanlan.zhihu.com/p/108118011)
- [基于 lerna 和 yarn workspace 的 monorepo 工作流](https://zhuanlan.zhihu.com/p/71385053)
