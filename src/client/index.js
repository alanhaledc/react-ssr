import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'

// import Routes from '../routes'
import routes from '../routes'
import { getClientStore } from '../store'

const App = () => {

  const store = getClientStore()

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          {
            renderRoutes(routes)
          }
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'))