import React, { Component } from 'react'

class NotFound extends Component {
  componentWillMount() {
    // 404 页面标示, 传入到服务端渲染中
    const { staticContext } = this.props
    staticContext && (staticContext.NOT_FOUND = true)
  }

  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Sorry, page not found!</p>
      </div>
    )
  }
}

export default NotFound
