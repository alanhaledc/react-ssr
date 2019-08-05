import React, { Component } from 'react'

export default styles => DecorateComponent =>
  class WithStyle extends Component {
    componentWillMount() {
      if (this.props.staticContext) {
        // 把样式注入到 context 中
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render() {
      return <DecorateComponent {...this.props} />
    }
  }
