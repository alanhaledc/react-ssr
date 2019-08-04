import axios from 'axios'

import config from '../config'

const clientAxiosInstance = axios.create({
  baseURL: '/',
  params: {
    secret: config.secret
  }
})

export default clientAxiosInstance
