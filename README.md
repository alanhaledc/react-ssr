# react-ssr

> React 服务端渲染 (Server-Side Render) Demo

## 技术栈

**React 全家桶 + Node.js + Express.js + Webpack**

## 启动项目

```bash
# setup ssr server on development environment
yarn start:dev

# setup ssr server on production environment
yarn start:prod
```

## 实现原理

### 同构

1. 同构，在服务端中执行一遍代码，然后在客户端又执行一遍代码。

2. 服务端渲染通过虚拟 DOM 渲染出 HTML 字符串发送给浏览器，加快页面渲染速度，同时有利于搜索引擎爬虫抓取页面。

3. 客户端渲染则处理服务端渲染不能处理的真实 DOM 的相关问题（事件绑定等）。

4. 服务端和客户端渲染出一致的内容时使用`hydrate`渲染。

### 路由匹配

1. 服务端渲染使用 `StaticRouter` 路由组件，该组件有两个非常重要的属性，属性 `location` 可以定位路由；属性 `context` 具有通信功能，传入的值会转存为一个名为 `staticContext` 的对象，可以在组件里对其赋值，在服务端完成字符串渲染后可以获取到所赋的值。

2. [react-router-config](https://github.com/ReactTraining/react-router) 库的 `matchRoutes` 方法匹配多级路由，`renderRoutes` 方法渲染多级路由，路由需要改造成配置类型（键值对类型）。

3. 页面跳转后，`StaticRouter` 定位到跳转后路径的组件，服务端渲染该组件成字符串。

4. 服务端渲染比客户端渲染更快，不能等到客户端解析 JS 后再去请求数据，需要提前请求数据。

### 数据处理

1. 服务端渲染前调用组件的`loadData`方法提前获取到数据并渲染到字符串中。

2. 注水：服务端还将获取的数据注入到`script`标签中。

3. 脱水：客户端直接从`script`标签中获取数据，而不用等到解析 JS 后再请求获取数据，加快页面渲染速度，也防止页面跳白。

4. 页面没有第一时间加载而是跳转过来的时候还是需要客户端渲染请求数据。

### 中间件代理

1. `Node.js`不但可以提供服务端渲染，还可以作为中间层连接客户端和后端服务器。客户端的数据请求需要经过中间层代理后，才能向后端服务器请求数据，而服务端渲染(渲染服务器)的请求则不需要代理，可以向后端服务器发送请求，这样可以避免请求路径混乱，有利于更好地排查错误。

2. 引入 thunk 的第三个参数构建不同的请求实例，不同请求实例的`baseUrl`不相同，所以`store`派发`action`的时候发送的请求不一样，区分为浏览器请求和服务端请求。

### 404 状态 和 301 重定向

1. 利用`context`的通信功能，在 404 组件中的`staticContext`的对象上添加属性`NOT_FOUND`，此时服务端渲染字符串后，获取到传入的`context`中有这个属性，设置成 404 状态码。

2. 在组件重定向的时候，组件中`staticContext`对象添加属性`action: REPLACE, url: xxx`，此时服务端渲染字符串后，获取到传入的`context`中有这些属性，手动重定向页面。

### CSS 处理

1. 服务端渲染中使用[isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader)把 CSS 样式名渲染到 DOM 字符串中，并且提供服务端渲染获取 CSS 样式的方法`_getCss`。

2. 利用`context`的通信功能，把获取到的 CSS 样式注入到渲染字符串的`style`标签中。

### SEO 优化

使用[react-helmet](https://github.com/nfl/react-helmet)定制化组件的`title`和`description`，优化 SEO。
