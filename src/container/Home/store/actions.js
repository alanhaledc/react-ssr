import { CHANGE_HOME_LIST } from './constants'

const changeHomeList = (data) => ({
  type: CHANGE_HOME_LIST,
  data: data
})


export const getHomeList = () => {
  return (dispatch, getState, axiosInstance) => {
    // http://127.0.0.1:4500/ssr/api/news.json  模拟远程端口
    // 浏览器运行
    // /api/news.json = http://127.0.0.1:3000/api/news.json
    // 服务器
    // /api/news.json = 浏览器根目录下的 /api/news.json

    // let url = ''
    // if (isServer) {
    //   url = 'http://127.0.0.1:4500/ssr/api/news.json'
    // } else {
    //   url = '/api/news.json'
    // }

    // const request = isServer ? serverAxios : clientAxios  可以使用withExtraArgument传入api参数(第三个参数)

    return axiosInstance.get('/api/news.json')
      .then(res => {
        const data = res.data.data
        dispatch(changeHomeList(data))
      })
  }
}