import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'

import { render } from './utils'
import { getStore } from '../store'
import routes from '../routes'

const app = express()
app.use(express.static('public'))

// 注意只代理客户端的请求
// /api/news.json 请求的url(本地的)
// req.url = /new.json 返回的url
// proxyReqPathResolver = /ssr/api/news.json 代理的url(远程的，这里使用本地的模拟)
// http://127.0.0.1:4500 + proxyReqPathResolver  代理的完整url
// http://127.0.0.1:4500/ssr/api/news.json

app.use('/api', proxy('http://127.0.0.1:4500', {
  proxyReqPathResolver: function (req) {
    return `/ssr/api${req.url}`
  }
}))

app.get('*', function (req, res) {

  const store = getStore(req)

  // 如果在这里，我能够拿到异步数据，并填充到store之中
  // store里面到底填充什么，我们不知道，我们需要结合当前用户请求的地址，和路由做判断
  // 如果用户访问'/'路径，我们就要到home组件的异步数据
  // 如果用户访问'/login'路径，我们就要到login组件的异步数据
  // 需要改造路由

  // 根据路由的路径往store里面加数据

  const matchedRoutes = matchRoutes(routes, req.path)

  const promises = []

  // 一个页面要加载A,B,C,D 四个组件，这四个组件需要服务器加载数据
  // 假如A组件加载错误
  // B,C,D组件有几种情况
  // 1. B,C,D组件已经加载完成了
  // 2. 假如 B,C,D组件接口比较慢，B,C,D组件数据没有加载完成
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {

      // 重新封装promise对象，增加捕获错误处理
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })
  Promise.all(promises).then(() => {
    // 传递context参数，根据页面的参数设置404页面状态码为404
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

app.listen(3000, err => {
  if (err) throw err
  console.log('Server starting at port 3000!')
})