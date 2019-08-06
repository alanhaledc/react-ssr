import React from 'react'

const NotFound = ({ staticContext }) => {
  // 404 页面标示, 传入到服务端渲染中
  if (staticContext) {
    staticContext.NOT_FOUND = true
  }

  return (
    <div>
      <h1>404</h1>
      <p>Sorry, page not found!</p>
    </div>
  )
}

export default NotFound
