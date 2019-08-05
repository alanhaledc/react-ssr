import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

// 服务端渲染的方法：把组件渲染成字符串
export const render = (store, routes, req, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  )
  
  // helmet 服务端渲染配置
  const helmet = Helmet.renderStatic()

  // 获取客户端的 css 字符串
  const cssStr = context.css.length ? context.css.join('\n') : ''

  return `
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <style>${cssStr}</style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
          // 注水
          window.context = {
            state: ${JSON.stringify(store.getState())} 
          }
          </script>
          <!-- 引入客户端渲染的 JS 文件 -->
          <script src="./index.js"></script>
        </body>
      </html>
    `
}
