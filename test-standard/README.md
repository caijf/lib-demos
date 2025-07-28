# 前端规范相关工具集成

## [eslint](https://eslint.org/)

检查 es/ts 语法，发现问题，代码格式。其中，代码格式一般会交给 `prettier` 处理。

### eslint v9

- **环境准备**

`nodejs >= 18`

- **安装**

```bash
pnpm add eslint @eslint/js typescript-eslint globals -D
```

> 如果不使用 `typescript` 可以不安装 `typescript-eslint`，配置文件直接导出一个数组即可。

- 配置文件

`eslint.config.mjs`

```typescript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/', 'dist-analyze/', 'dev-dist/', 'dist-ssr/', 'types/', 'build/', 'docs/', 'coverage/', 'lib/', 'es/']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0
    }
  }
);
```

- **react-hooks**

如果是 react 开发项目，可以添加 `eslint-plugin-react-hooks` 插件。

```bash
pnpm add eslint-plugin-react-hooks -D
```

`eslint.config.mjs`

```diff
+ import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  // ...
  {
    plugins: {
      // ...
+     'react-hooks': reactHooks,
    },
    // ...
    rules: {
      // ...
+     ...reactHooks.configs.recommended.rules
    }
  }
)
```

- **react-refresh**

用于配合 React Refresh 来进行代码检查。

```bash
pnpm add eslint-plugin-react-refresh -D
```

`eslint.config.mjs`

```diff
+import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  //...
  {
    plugins: {
      // ...
+      'react-refresh': reactRefresh
    },
    //...
  }
);
```

- **常用脚本**

`package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

<details>
  <summary>eslint v8 说明</summary>

- **安装**

```bash
pnpm add eslint -D
```

- **初始化配置**

```bash
npx eslint --init
```

根据交互式命令快速生成 `eslint` 配置文件，安装对应的包。

- **常用脚本**

```javascript
{
  // ...
  "scripts": {
    // ...
    "lint": "eslint . --ext .js,.mjs,.jsx,.ts,.tsx"
  }
}
```

- **常见问题**

1. `.eslintrc.js` 提示 `'module' is not defined.`

环境配置添加 `node: true` ：

```javascript
{
  // ...
  "env": {
    // ...
    "node": true
  }
}
```

更多特殊环境配置，请查阅 [Specifying Environments](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments) 。

2. 如果部分文件不想检查，可设置 `.eslintignore` 忽略

新建 `.eslintignore` 文件。比如，一些构建文件不需要检测：

```text
/lib
/es
/dist
/dist-ssr
/dist-analyze
/dev-dist
/types
/docs
/build
/coverage
```

3. 自定义集成第三方检查库

比如 react 的项目，集成 `eslint-plugin-react-hooks` 检测 `react hooks` 规则。请查阅 [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) 。

```bash
pnpm add eslint-plugin-react-hooks -D
```

```javascript
// Your ESLint configuration
{
  "extends": [
    // ...
    'plugin:react-hooks/recommended'
  ]
}
```

</details>

## [stylelint](https://stylelint.io/)

规范样式，发现和修复样式问题。

- **安装**

```bash
pnpm add stylelint -D
```

- **参考配置**

需要安装：

```bash
pnpm add stylelint-config-css-modules stylelint-config-standard stylelint-no-unsupported-browser-features stylelint-declaration-block-no-ignored-properties postcss-less -D
```

`stylelint.config.js`

```javascript
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-no-unsupported-browser-features'
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  customSyntax: 'postcss-less',
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null,
    'declaration-empty-line-before': null,
    'keyframes-name-pattern': null,
    'custom-property-pattern': null,
    'number-max-precision': 8,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'color-function-alias-notation': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'rule-empty-line-before': null,
    'import-notation': ['string'],
    'value-keyword-case': ['lower', { ignoreKeywords: ['optimizeLegibility'] }],
    'selector-no-vendor-prefix': [
      true,
      { ignoreSelectors: ['::-webkit-input-placeholder', '/-moz-.*/'] }
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
};
```

`.stylelintignore`

```text
node_modules/
/lib
/es
/dist
/dist-ssr
/dist-analyze
/dev-dist
/types
/docs
/build
/coverage
```

- **常用脚本**

```javascript
{
  // ...
  "scripts": {
    // ...
    "lint:style": "stylelint src/**/*.{css,less}",
  }
}
```

- **常见问题**

[`官网`](https://stylelint.io/) 或 [`github issue`](https://github.com/stylelint/stylelint/issues) 中搜索对应规则一般都可以找到方案。

1. 保存 `*.less` 文件后自动处理样式顺序

> 注意： 插件不会自动加载，需要手动配置 `prettier plugins` ，参考：<https://github.com/prettier/prettier/issues/14905>

安装 [`prettier-plugin-two-style-order`](https://www.npmjs.com/package/prettier-plugin-two-style-order)

```bash
pnpm add prettier-plugin-two-style-order -D
```

项目根目录新增 `.vscode` 目录，并添加以下文件：

`extensions.json`

```javascript
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint"
  ]
}
```

`settings.json` 可选，添加会覆盖本地配置

```javascript
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

`prettier` 配置

```diff
{
  // ...
+  "plugins": [
+    "prettier-plugin-two-style-order"
+  ]
}
```

## [prettier](https://prettier.io/)

美化各种文档。

- **安装**

```bash
pnpm add prettier -D
```

- **配置项**

> `cli` 命令参数类似，不再赘述

添加配置文件 `.prettierrc` 。

| 配置项 | 描述 | 可选项/类型 | 默认值 |
| --- | --- | --- | --- |
| **_arrowParens_** | 当箭头函数仅有一个参数时加上括号 | `"always"` - 总是添加圆括号，示例： (x) => x <br> `"avoid"` - 尽可能不添加圆括号，示例：x => x | `"always"` |
| bracketSameLine | 将 `>` 多行 HTML（HTML、JSX、Vue、Angular）元素的 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。 | `boolean` | `false` |
| **_bracketSpacing_** | 控制对象字面量的空格输出 | `true` - `{ foo: bar }` <br/>`false` - `{foo: bar}` | `true` |
| embeddedLanguageFormatting | 是否格式化文件中嵌入的引用代码。 | `"auto"` - 如果 Prettier 可以自动识别嵌入代码，请对其进行格式化。<br/>`"off"` - 永远不要自动格式化嵌入的代码。 | `"auto"` |
| endOfLine | 行结束换行格式。当使用`\n`(LF)时，所有操作系统中的所有现代文本编辑器都能够正确显示行尾。 | `"lf"` – 仅(`\n`)换行，常见于 Linux 和 macOS 以及 git repos 内<br/>`"crlf"` - 回车符 + 换行符 (`\r\n`)，在 Windows 上很常见<br/>`"cr"` - 仅回车符 (`\r`)，很少使用<br/>`"auto"` - 维护现有的行尾（通过查看第一行之后使用的内容来规范化一个文件中的混合值） | `"lf"` |
| filepath | 指定用于推断要使用的解析器的文件名。 | `string` | - |
| htmlWhitespaceSensitivity | 为 HTML、Vue、Angular 和 Handlebars 指定全局空白敏感度。 | `"css"` - 尊重 CSS `display` 属性的默认值。对于 Handlebars 与 `strict` 一样。<br/>`"strict"` - 所有标签周围的空白（或没有空白）被认为是重要的。<br/>`"ignore"` - 所有标签周围的空白（或没有空白）被认为是无关紧要的。 | `"css"` |
| insertPragma | 在文件顶部插入一个特殊标记`@format`，指定文件已使用 Prettier 格式化。当与 `--require-pragma` 选项一起使用时，这很有效。如果文件顶部已经有一个 docblock，那么这个选项将添加一个带有`@format`标记的换行符。 | `boolean` | `false` |
| jsxSingleQuote | 在 JSX 中使用单引号代替双引号。 | `boolean` | `false` |
| overrides | 提供一个列表用于覆盖 `Prettier` 规则 | `[]` | - |
| parser | 指定要使用的解析器。Prettier 会自动从输入文件路径推断解析器，因此您不必更改此设置。 | `string` | - |
| plugins | 添加插件 | `[]` | - |
| pluginSearchDirs | 在 node_modules 子目录中包含 Prettier 插件的自定义目录。当相对于 Prettier 的位置搜索插件时，覆盖默认行为。 | `[]` | - |
| printWidth | 指定每行代码的最佳长度，如果超出长度则换行。 | `number` | `80` |
| **_proseWrap_** | （Markdown）将散文包含在多行中 | `"always"` - 如果散文超过打印宽度，则将其包裹起来。<br/>`"never"` - 不要包装散文。<br/>`"preserve"`- 按原样包装散文。 | `"preserve"` |
| quoteProps | 引用对象中的属性时更改。 | `"as-needed"` - 仅在需要时在对象属性周围添加引号。<br/>`"consistent"` - 如果对象中至少有一个属性需要引用，请引用所有属性。<br/>`"preserve"` - 尊重对象属性中引号的输入使用。 | `"as-needed"` |
| rangeStart<br/>rangeEnd | 仅格式化文件的一部分。<br/>这两个选项可用于格式化以给定字符偏移量（分别为包含和不包含）开始和结束的代码。 | `number` | `0`<br/>`Infinity` |
| requirePragma | 将自身限制为仅在文件顶部包含称为 pragma 的特殊注释的格式文件。这在逐渐将大型无格式代码库过渡到 Prettier 时非常有用。 | `boolean` | `false` |
| **_semi_** | 在语句末尾打印分号。 | `true` - 在每条语句的末尾添加一个分号。<br/>`false` - 仅在[可能导致 ASI 失败](https://prettier.io/docs/en/rationale.html#semicolons)的行的开头添加分号。 | `true` |
| **_singleQuote_** | 使用单引号代替双引号。<br/>注意：JSX 引号忽略此选项，而是用 jsxSingleQuote。 | `boolean` | `false` |
| **_tabWidth_** | 指定每个缩进级别的空格数。 | `number` | `2` |
| **_trailingComma_** | 在多行逗号分隔的句法结构中尽可能打印尾随逗号。（例如，单行数组永远不会有尾随逗号。） | `"es5"` - 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。<br/>`"none"` - 没有尾随逗号。<br/>`"all"` - 尽可能尾随逗号（包括[函数参数和调用](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#Trailing_commas_in_functions)）。要运行，以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或[下级编译](https://babeljs.io/docs/en/index)的引擎。这也支持 TypeScript 中类型参数中的尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）。 | `"es5"` |
| **_useTabs_** | 用制表符而不是空格缩进行。 | `boolean` | `false` |
| vueIndentScriptAndStyle | 是否缩进 Vue 文件中的代码`<script>`和`<style>`标签。有些人（如 Vue 的创建者）不缩进以保存缩进级别，但这可能会破坏编辑器中的代码折叠。<br/>`false` - 不要在 Vue 文件中缩进脚本和样式标签。<br/>`true` - 在 Vue 文件中缩进脚本和样式标签。 | `boolean` | `false` |

> 注：常用配置字体加粗斜体

- **常用配置**

`.prettierrc`

```javascript
{
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "useTabs": false,
  "semi": true,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "proseWrap": "never"
}
```

- **常用脚本**

```javascript
{
  // ...
  "scripts": {
    // ...
    "prettier": "prettier -w **/*"
  }
}
```

- **常见问题**

1. 如果部分文件不想格式化，可设置 `.prettierignore` 忽略

比如：

```text
.DS_Store

CNAME
LICENSE
logs
*.log
package.json
package-lock.json
*.lock
yarn-error.log
*debug.log
pnpm-lock.yaml

.gitignore
.prettierignore
.eslintignore
.eslintcache
.history

*.svg
*.png
*.jpg
*.jpeg
*.gif
*.bmp
*.ico

/lib
/es
/dist
/dist-ssr
/dist-analyze
/dev-dist
/types
/docs
/build
/coverage
```

## [lint-staged](https://www.npmjs.com/package/lint-staged)

在 git 暂存文件上运行 linters 的工具。

主要是在 git commit 之前对暂存文件进行 lint 检查，而每次修改就给所有文件执行一次 lint 检查。

- **安装**

```bash
pnpm add lint-staged -D
```

- **常用脚本**

如果你用到上面介绍的 `eslint` `stylelint` `prettier` ，可配置如下：

```javascript
{
  // ...
  "scripts": {
    "precommit": "lint-staged" // 后面改用 husky 的 pre-commit
  },
  "lint-staged": {
    "**/*.{css,less}": "stylelint --fix",
    "**/*.{js,mjs,jsx,ts,tsx}": "eslint",
    "**/*.{css,scss,less,js,mjs,jsx,ts,tsx,json,md}": "prettier -w"
  }
}
```

在 git commit 之前执行 `lint-staged` 对暂存文件格式化、代码检测。

## [commitlint](https://commitlint.js.org/)

规范 git commit 提交信息，需要配合 git hooks 工具使用。

git hooks 工具：

- [`husky`](https://typicode.github.io/husky/)
- [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)
- [`yorkie`](https://www.npmjs.com/package/yorkie)

以下为使用 husky 示例

- **安装**

先安装 `husky`

> 当前 husky 版本 v9+

```bash
pnpm add husky -D
```

```bash
pnpm exec husky init
# or
npx husky init
```

```bash
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
echo 'npx --no-install lint-staged' > .husky/pre-commit
```

_上面 lint-staged 中 precommit 也可以在 git hooks 中设置 ，注意不要重复设置。_

安装 commitlint 相关的包

```bash
pnpm add @commitlint/cli @commitlint/config-conventional @commitlint/cz-commitlint commitizen inquirer@9 -D
```

生成配置文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

- **配置**

`package.json`

```javascript
{
  // ...
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```

- **常用脚本**

这里使用了 [`commitizen`](https://www.npmjs.com/package/commitizen) [`@commitlint/cz-commitlint`](https://www.npmjs.com/package/@commitlint/cz-commitlint) 交互式生成规范提交信息。

```javascript
{
  // ...
  "scripts": {
    // ...
    "commit": "cz"
  }
}
```

原先使用 `git commit -m xxx` 改用 `pnpm commit` ，当然也可以直接使用 `npx cz`。

## package json 配置

如果以上都配置了，大概内容如下：

```javascript
// package.json
{
  // ...
  "scripts": {
    // ...
    "prettier": "prettier -w **/*",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:style": "stylelint src/**/*.{css,less}",
    "prepare": "husky",
    "commit": "cz"
  },
  "lint-staged": {
    "**/*.{css,less}": "stylelint --fix",
    "**/*.{js,mjs,jsx,ts,tsx}": "eslint",
    "**/*.{css,scss,less,js,mjs,jsx,ts,tsx,json,md}": "prettier -w"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```

## 补充

`.gitignore` 常用配置

```text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
logs
*.logo
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
node_modules

# testing
coverage

# production
build
zip
dist
dist-ssr
dist-analyze
dev-dist
*.local

# misc
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```
