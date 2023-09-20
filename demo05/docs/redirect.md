# redirect

通用的重定向页面。

## 使用

### 重定向页

将 url 参数中的 `nextpage` 作为重定向页面，并将当前 url 其余参数赋值给 `nextpage` 。

1. 格式：

```text
https://example.com/redirect.html?nextpage={encodeURIComponent(redirect_url)}&a=xxx&b=xx

# 重定向到
redirect_url?a=xxx&b=xx
```

如果 `redirect_url` 带有 `hash` 或 `search` 也可以正常处理，多余的参数将合并到 `search` 中。

2. 示例：

例如，要重定向到的链接为 `https://example.com/?x=1&y=2#/apply/list` ，且变更参数 `x=5` 。（这里只是演示跳转页面和参数）

```text
https://example.com/redirect.html?nextpage=https%3A%2F%2Fexample.com%2F%3Fx%3D1%26y%3D2%23%2Fapply%2Flist&x=5

# 重定向到
https://example.com/?x=5&y=2#/apply/list
```

### 缓存

参数中除了 `nextpage` 外，还有两个特殊参数 `local_storage` 和 `session_storage` 。

这两个特殊参数不会添加到 `nextpage` ，而是会添加到当前域名 `https://example.com` 的缓存中。

**注意缓存的值需要先序列化 `JSON.stringify` 再编码 `encodeURIComponent` 。**

1. 格式：

```text
https://example.com/webapp/ux-common/redirect.html?nextpage={encodeURIComponent(redirect_url)}&local_storage={encodeURIComponent(JSON.stringify(data))}

# 解析 data 并添加到 localStorage

# 重定向到
redirect_url?a=xxx&b=xx
```

2. 示例：

例如，要重定向到的链接为 `https://example.com/?x=1` ，且设置缓存 `{ token: "123456" }` 。

```text
https://example.com/webapp/ux-common/redirect.html?nextpage=https%3A%2F%2Fexample.com%2F%3Fx%3D1&local_storage=%7B%22token%22%3A%22123456%22%7D

# localStorage 设置缓存 "token" 的值为 "123456"

# 再重定向到
https://example.com/?x=1
```

### 调试模式

只需添加参数 `debug=1` 即可。

调试模式会将缓存和跳转信息显示在页面中，不会跳转。

```text
https://example.com/webapp/ux-common/redirect.html?nextpage=https%3A%2F%2Fexample.com%2F%3Fx%3D1&local_storage=%7B%22token%22%3A%22123456%22%7D&debug=1
```

## 构建打包

```bash
yarn zip
```

## 应用场景

### 小程序 webview 打开 h5

小微合作伙伴小程序 webview 打开 h5 需要透传 `token` ，并将 `token` 先缓存再跳转到对应页面（进件介绍页、详情页）。

- 进件介绍页：`https://example.com/index.html#/product?channel=min-app-wx`
- 详情页：`https://example.com/index.html#/order/detail?orderId=xxx&channel=min-app-wx`

```text
# 进件介绍页
https://example.com/redirect.html?nextpage=https%3A%2F%2Fexample.com%2Findex.html%23%2Fproduct%3Fchannel%3Dmin-app-wx&local_storage=%7B%22token%22%3A%22123456%22%7D

# 详情页
https://example.com/webapp/ux-common/redirect.html?nextpage=https%3A%2F%2Fexample.com%2F%23%2Forder%2Fdetail%3ForderId%3Dxxx%26channel%3Dmin-app-wx&local_storage=%7B%22token%22%3A%22123456%22%7D
```

### 封装方法

```javascript
/**
 * 获取跳转地址
 *
 * @param {string} url 目标地址
 * @param {Object} [options] 配置项
 * @param {Object} [options.local] localStorage 缓存
 * @param {Object} [options.session] sessionStorage 缓存
 * @param {boolean} [options.debug=false] 调试模式
 * @returns {string} 跳转地址
 */
function getRedirectUrl(url, options) {
  const { local, session, debug = false } = options || {};
  let redirectUrl = `https://example.com/redirect.html?nextpage=${encodeURIComponent(
    url
  )}`;
  const localKeys = Object.keys(local || {});
  const sessionKeys = Object.keys(session || {});
  if (localKeys.length > 0) {
    redirectUrl += `&local_storage=${encodeURIComponent(
      JSON.stringify(local)
    )}`;
  }
  if (sessionKeys.length > 0) {
    redirectUrl += `&session_storage=${encodeURIComponent(
      JSON.stringify(session)
    )}`;
  }
  if (debug) {
    redirectUrl += '&debug=1';
  }
  return redirectUrl;
}

const url = getRedirectUrl(
  'https://example.com/index.html#/product?channel=min-app-wx',
  {
    local: { token: '123456' },
  }
);
```
