import React, { Component } from 'react'

class NotFound extends Component {

  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Sorry, page not found!</p>
      </div>
    )
  }

  componentWillMount() {
    // 404页面标示
    const { staticContext } = this.props
    staticContext && (staticContext.NOT_FOUND = true)
  }
}

export default NotFound