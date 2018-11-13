import axios from 'axios'
import config from '../config'

const createInstance = req => axios.create({
  baseURL: 'http://127.0.0.1:4500/ssr',
  headers: {
    cookie: req.get('cookie') || ''
  },
  params: {
    secret: config.secret
  }
})

export default createInstance