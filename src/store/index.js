import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { reducer as homeReducer } from '../container/Home/store'
import { reducer as headerReducer } from '../components/Header/store'
import { reducer as translationReducer } from '../container/Translation/store'
import clientAxiosInstance from '../client/request'
import createServerAxiosInstance from '../server/request'

const reducers = combineReducers({
  home: homeReducer,
  header: headerReducer,
  translation: translationReducer
})

export const getStore = req =>
  // withExtraArgument 额外传入一个参数，下同
  // 改变服务端 store 的内容，一定要使用 serverAxiosInstance
  createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(createServerAxiosInstance(req)))
  )

export const getClientStore = () => {
  // 第一次加载时，从服务端中擦入到页面的数据中获取数据，而不是从 componentDidMount 中获取，防止页面跳白
  // 改变客户端 store 的内容，一定要使用 clientAxiosInstance
  const defaultState = window.context.state // 脱水
  return createStore(
    reducers,
    defaultState,
    applyMiddleware(thunk.withExtraArgument(clientAxiosInstance))
  )
}
