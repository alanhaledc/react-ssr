import React, { Component } from 'react'

const withStyle = styles => {
  return DecorateComponent => {
    return class WithStyle extends Component {
      componentWillMount() {
        if (this.props.staticContext) {
          this.props.staticContext.css.push(styles._getCss())
        }
      }

      render() {
        return <DecorateComponent {...this.props} />
      }
    }
  }
}

export default withStyle
