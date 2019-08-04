import * as types from './types'

const changeLoginStatus = value => ({
  type: types.CHANGE_LOGIN_STATUS,
  value
})

export const getHeaderInfo = () => (dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/isLogin').then(res => {
    if (res.data.success) {
      const isLogin = res.data.data.isLogin
      dispatch(changeLoginStatus(isLogin))
    }
  })

export const login = () => (dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/login').then(res => {
    if (res.data.success) {
      const isLogin = res.data.data.isLogin
      dispatch(changeLoginStatus(isLogin))
    }
  })

export const logout = () => (dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/logout').then(res => {
    if (res.data.success) {
      const isLogin = res.data.data.isLogin
      dispatch(changeLoginStatus(isLogin))
    }
  })
