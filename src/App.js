import React from 'react'
import { renderRoutes } from 'react-router-config'

import Header from './components/Header'
import { actions } from './components/Header/store'

const App = props => {
  return (
    <div>
      {/* 路由组件才有 staticContext 属性，把它传入到 header 组件中 */}
      <Header staticContext={props.staticContext} />

      {/* renderRoutes 渲染多级路由 */}
      {renderRoutes(props.route.routes)}
    </div>
  )
}

// 获取登录状态
App.loadData = store => store.dispatch(actions.getLoginStatus())

export default App
