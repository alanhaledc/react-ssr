import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../routes'
import React from 'react'


export const render = (req) => {
  const content = renderToString(
    <StaticRouter location={ req.path } context={ {} }>
      { Routes }
    </StaticRouter>
  )
  return `
<html>
  <head>
    <title>react-ssr</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="./index.js"></script>
  </body>
</html>
`
}