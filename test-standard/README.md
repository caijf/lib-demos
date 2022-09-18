# 前端规范相关工具集成

## [eslint](https://eslint.org/)

检查 es/ts 语法，发现问题，代码格式。其中，代码格式一般会交给 `prettier` 处理。

- **安装**

```bash
yarn add eslint --dev
```

- **初始化配置**

```bash
npx eslint --init
```

根据交互式命令快速生成 `eslint` 配置文件，安装对应的包。

- **常用脚本**

```javascript
"scripts": {
  // ...
  "lint:js": "eslint --ext .js,.jsx,.ts,.tsx src",
  "lint-fix:js": "npm run lint:js -- --fix"
}
```

- **常见问题**

1. `.eslintrc.js` 提示 `'module' is not defined.`

环境配置添加 `node: true` ：

```javascript
"env": {
  // ...
  "node": true
}
```

更多特殊环境配置，请查阅 [Specifying Environments](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments) 。

2. 如果部分文件不想检查，可设置 `.eslintignore` 忽略

新建 `.eslintignore` 文件。比如，一些构建文件不需要检测：

```text
/lib
/es
/dist
```

3. 自定义集成第三方检查库

比如 react 的项目，集成 `eslint-plugin-react-hooks` 检测 `react hooks` 规则。请查阅 [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) 。

```bash
yarn add eslint-plugin-react-hooks --dev
```

```javascript
// Your ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

## [stylelint](https://stylelint.io/)

规范样式，发现和修复样式问题。

- **安装**

```bash
yarn add stylelint --dev
```

- **参考配置**

需要安装：

```bash
yarn add stylelint-config-standard stylelint-config-css-modules stylelint-config-rational-order stylelint-config-prettier stylelint-no-unsupported-browser-features stylelint-declaration-block-no-ignored-properties --dev
```

`stylelint.config.js`

```javascript
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
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

- **常用脚本**

```javascript
"scripts": {
  // ...
  "lint:style": "stylelint src/**/*.less",
  "lint-fix:style": "npm run lint:stylelint -- --fix"
}
```

- **常见问题**

[`官网`](https://stylelint.io/) 或 [`github issue`](https://github.com/stylelint/stylelint/issues) 中搜索对应规则一般都可以找到方案。

1. 保存 `*.less` 文件后自动处理样式顺序

可安装 [`prettier-plugin-two-style-order`](https://www.npmjs.com/package/prettier-plugin-two-style-order)

```bash
yarn add prettier-plugin-two-style-order -D
```

项目根目录新增 `.vscode` 目录，并添加以下文件：

`extensions.json`

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint"
  ]
}
```

`settings.json`

```json
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## [prettier](https://prettier.io/)

美化各种文档。

- **安装**

```bash
yarn add prettier --dev
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

_注：常用配置字体加粗斜体_

- **常用配置**

**.prettierrc**

```javascript
{
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "useTabs": false,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "always",
  "proseWrap": "never"
}
```

- **常用脚本**

```javascript
"scripts": {
  // ...
  "prettier": "prettier --write **/*"
}
```

- **常见问题**

1. 如果部分文件不想格式化，可设置 `.prettierignore` 忽略

比如：

```text
.DS_Store

CNAME
LICENSE
package.json
package-lock.json

*.lock
yarn-error.log
*debug.log

.gitignore
.prettierignore
.eslintignore
.eslintcache
.history

*.svg
*.png
*.jpg
*.gif
*.bmp

/dist
/build
```

## [lint-staged](https://www.npmjs.com/package/lint-staged)

在 git 暂存文件上运行 linters 的工具。

主要是在 git commit 之前对暂存文件进行 lint 检查，而每次修改就给所有文件执行一次 lint 检查。

- **安装**

```bash
yarn add lint-staged --dev
```

- **常用脚本**

如果你用到上面介绍的 `eslint` `stylelint` `prettier` ，可配置如下：

```javascript
"scripts": {
  "lint-staged": "lint-staged",
  "precommit": "lint-staged"
},
"lint-staged": {
  "**/*.{css,less}": "stylelint --fix",
  "**/*.{js,jsx,ts,tsx}": "eslint",
  "**/*.{css,scss,less,js,jsx,ts,tsx,json,md}": "prettier -w"
}
```

在 git commit 之前执行 `lint-staged` 对暂存文件格式化、代码检测。

## [commitlint](https://commitlint.js.org/)

规范 git commit 提交信息，需要配合 git hooks 工具使用。

git hooks 工具：

- [`husky`](https://typicode.github.io/husky/)
- [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)
- [`yorkie`](https://www.npmjs.com/package/yorkie)

以下为使用 yorkie 示例

- **安装**

```bash
yarn add @commitlint/cli @commitlint/config-conventional cz-conventional-changelog yorkie --dev
```

生成配置文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

- **配置**

`package.json`

```javascript
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
},
"gitHooks": {
  "pre-commit": "lint-staged",
  "commit-msg": "npx --no -- commitlint --edit \"$1\""
}
```

_上面 lint-staged 中 precommit 也可以在 git hooks 中设置 ，注意不要重复设置。_

- **常用脚本**

这里使用了 [`commitizen`](https://www.npmjs.com/package/commitizen) [`cz-conventional-changelog`](https://www.npmjs.com/package/cz-conventional-changelog) 交互式生成规范提交信息。

```javascript
"scripts": {
  // ...
  "commit": "cz"
},
```

原先使用 `git commit -m xxx` 改用 `yarn commit` ，当然也可以直接使用 `npx cz`。

## package json 配置

如果以上都配置了，大概内容如下：

```javascript
// package.json
{
  "scripts": {
    // ...
    "lint-staged": "lint-staged",
    "prettier": "prettier --write **/*",
    "lint": "npm run lint:js && npm run lint:style",
    "lint:fix": "npm run lint-fix:js && npm run lint-fix:style",
    "lint:js": "eslint --ext .js,.jsx,.ts,.tsx src",
    "lint-fix:js": "npm run lint:js -- --fix",
    "lint:style": "stylelint src/**/*.less",
    "lint-fix:style": "npm run lint:stylelint -- --fix",
    "commit": "cz"
  },
  "lint-staged": {
    "**/*.{css,less}": "stylelint --fix",
    "**/*.{js,jsx,ts,tsx}": "eslint",
    "**/*.{css,scss,less,js,jsx,ts,tsx,json,md}": "prettier -w"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "npx --no -- commitlint --edit \"$1\""
  }
}
```

## 补充

`.gitignore` 常用配置

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules

# testing
coverage

# production
build
zip

# misc
.DS_Store

npm-debug.log*
yarn-debug.log*
yarn-error.log*
yarn.lock
package-lock.json
```
