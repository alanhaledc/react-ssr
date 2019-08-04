import axios from 'axios'
import config from '../config'

const createServerAxiosInstance = req =>
  axios.create({
    baseURL: 'http://127.0.0.1:4500/ssr',
    headers: {
      cookie: req.get('cookie') || '' // 获取 cookie
    },
    params: {
      secret: config.secret
    }
  })

export default createServerAxiosInstance
