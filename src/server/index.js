import express from 'express'
import React from 'react'
import proxy from 'http-proxy-middleware'
import { matchRoutes } from 'react-router-config'

import { render } from './utils'
import { getStore } from '../store'
import routes from '../routes'

const app = express()
app.use(express.static('public'))

// 注意只代理客户端的请求
// /api/news.json 请求的 url(本地的)
// req.url = /new.json 返回的url
// proxyReqPathResolver = /ssr/api/news.json 代理的 url (远程的，这里使用本地的模拟)
// http://127.0.0.1:4500 + proxyReqPathResolver 代理的完整 url
// http://127.0.0.1:4500/ssr/api/news

// 中间层代理 只代理客户端渲染的请求，客户端的请求必须经过中间层代理才能请求服务端数据
// 服务端的渲染的请求（loadData）不走代理，直接请求服务端数据
app.use(
  '/api',
  proxy({
    target: 'http://127.0.0.1:4500',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/ssr/api'
    }
  })
)

// 此处的路由和客户端渲染的 router 是一致的
app.get('*', function(req, res) {
  const store = getStore(req)

  // 如果在这里，能够拿到异步数据，并填充到 store 之中，然后渲染成字符串
  // store 里面到底填充什么，我们不知道，我们需要结合当前用户请求的地址，和路由做判断
  // 如果用户访问 '/' 路径，我们就要到 home 组件的异步数据
  // 如果用户访问 '/login' 路径，我们就要到 login 组件的异步数据
  // 需要改造路由
  // 根据路由的路径往 store 里面加数据

  // matchPath 只能匹配到一层路由
  // const matchRouters = []
  // routes.some(route => {
  //   const match = matchPath(req.path, route)
  //   if (match) {
  //     matchRouters.push(route)
  //   }
  // })

  // 匹配多级路由
  const matchedRoutes = matchRoutes(routes, req.path)

  const promises = []

  // 一个页面要加载 A,B,C,D 四个组件，这四个组件需要服务器加载数据
  // 假如 A 组件加载错误
  // B, C, D 组件有几种情况
  // 1. B, C, D 组件已经加载完成了
  // 2. 假如 B, C, D 组件接口比较慢，B, C, D 组件数据没有加载完成
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      // 重新封装 promise 对象，增加捕获错误处理
      const promise = new Promise((resolve, reject) => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch(resolve)
      })
      promises.push(promise)
    }
  })

  Promise.all(promises).then(() => {
    // 传递 context 参数，根据页面的参数设置 404 页面状态码为 404
    const context = {
      css: []
    }
    const html = render(store, routes, req, context)

    if (context.action === 'REPLACE') {
      // 服务端重定向
      res.redirect(301, context.url)
    } else if (context.NOT_FOUND) {
      res.status(404)
      res.send(html)
    } else {
      res.send(html)
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, error => {
  if (error) throw error
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})
