import { CHANGE_IS_LOGIN } from './constants'

const changeIsLogin = value => ({
  type: CHANGE_IS_LOGIN,
  value
})

export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/isLogin.json')
      .then(res => {
        const isLogin = res.data.data.isLogin
        dispatch(changeIsLogin(isLogin))
      })
  }
}

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/login.json')
      .then(res => {
        const isLogin = res.data.data.isLogin
        dispatch(changeIsLogin(isLogin))
      })
  }
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/logout.json')
      .then(res => {
        if (res.data.success) {
          dispatch(changeIsLogin(false))
        }
      })
  }
}