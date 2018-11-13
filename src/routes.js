import React from 'react'
// import { Route } from 'react-router-dom'

import App from './App'
import Home from './container/Home'
import Translation from './container/Translation'
import NotFound from './container/NotFound'

// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务端渲染，把页面返回给客户
export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: 'home',
        loadData: Home.loadData
      },
      {
        path: '/translation',
        component: Translation,
        exact: true,
        key: 'translation',
        loadData: Translation.loadData
      },
      {
        component: NotFound
      }
    ]
  }
]


// export default (
//   <div>
//     <Route path="/" exact component={ Home } />
//     <Route path="/login" exact component={ Login } />
//   </div>
// )