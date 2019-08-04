import * as types from './types'

const changeHomeList = list => ({
  type: types.CHANGE_HOME_LIST,
  list
})

// http://127.0.0.1:4500/ssr/api/news  模拟远程端口
// 浏览器渲染请求
// /api/news => http://127.0.0.1:3000/api/news => (代理)  http://127.0.0.1:4500/ssr/api/news
// 服务器渲染请求
// /api/news = 浏览器根目录下的/api/news(报错) => (不用代理) http://127.0.0.1:4500/ssr/api/news

// 不同的 url (需要手动传入 isServer 判断是浏览器渲染的请求还是服务器渲染的请求)
// let url = ''
// if (isServer) {
//   url = 'http://127.0.0.1:4500/ssr/api/news.json'
// } else {
//   url = '/api/news.json'
// }

// 不同的 axios 实例 同上
// const request = isServer ? serverAxios : clientAxios  可以使用 withExtraArgument 传入 api 参数 (第三个参数)

// 在 store 中传入第三个参数 => 不同请求的 axios 实例
export const getHomeList = () => (dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/news').then(res => {
    if (res.data.success) {
      const data = res.data.data
      dispatch(changeHomeList(data))
    }
  })
