import React, { Component } from 'react'
import Header from '../../components/Header'

class Home extends Component {

  render() {
    return (
      <div>
        <Header />
        <div>welcome to Home page</div>
        <button onClick={ () => alert('click') }>click</button>
      </div>
    )
  }
}

export default Home