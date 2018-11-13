import React, { Component } from 'react'

export default styles => {
  return DecorateComponent => {
    return class WithStyle extends Component {
      componentWillMount() {
        if (this.props.staticContext) {
          this.props.staticContext.css.push(styles._getCss())
        }
      }

      render() {
        return <DecorateComponent { ...this.props } />
      }
    }
  }
}