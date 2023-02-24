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

由于依赖提升（hoist 机制），所以要注意 [幽灵依赖](https://rushjs.io/zh-cn/pages/advanced/phantom_deps/) 问题，建议改用 `pnpm` 包管理工具，它也支持 `workspace` 。

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

```shell
lerna publish # 识别出修改的包 --> 创建新的版本号 --> 修改 package.json --> 提交修改 打上版本的 tag --> 推送到 git 上
```

如果你的包名是带 `scope` 的，例如： `"name": "@doly/ui",` 那需要在 package.json 添加

```diff
+  "publishConfig": {
+    "access": "public"
+  }
```

`Lerna` 有两种工作模式： `Fixed mode` 和 `Independent mode`

#### Fixed/Locked mode 固定/锁定模式（默认）

固定模式下 Lerna 项目全局仅有一个版本号。该版本号在项目根目录下的 `lerna.json` 文件中 `version` 属性中维护。运行 `lerna publish` 时，如果模块从上次发布以来有能触发发版行为的更新，则 `version` 会修改为要发布的新版本。这意味着可以仅在需要发布包的新版本。

#### Independent mode 独立模式

`lerna init --independent` 初始化项目。 或在 `lerna.json` 文件里面设置 `"version": "independent",` 。独立模式的 Lerna 项目允许各个包维护自己的版本。每次发布时，都会收到有关 `已更改的包` 的提示，以指定它是补丁、次要、主要还是自定义更改。

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
lerna run build # 所有包都会执行打包命令
lerna run start --scope=package # 运行某个包中的 script 命令
lerna add <pkg> # 添加依赖
lerna add <pkg> --scope=package # 某个包添加依赖
lerna import <dir> # 导入git提交历史
lerna changed # 列出下次发版 lerna publish 要更新的包
lerna version --force-publish # 忽略修改强制生成版本
lerna version --conventional-commits # 使用了这个选项，lerna会收集日志，自动生成 CHANGELOG。需安装依赖 yarn add conventional-changelog-cli -W -D
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
- [深入 lerna 发包机制 —— lerna publish](https://cloud.tencent.com/developer/article/1883132)
- [One For All：基于 pnpm + lerna + typescript 的最佳项目实践 - 理论篇](https://juejin.cn/post/7043998041786810398)
  - [都 2022 年了，pnpm 快到碗里来！](https://juejin.cn/post/7053340250210795557)
  - [Hard links and Symbolic links （硬链接 VS 符号链接）](https://juejin.cn/post/7032116303737389086/)
