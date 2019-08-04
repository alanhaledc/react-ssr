import * as types from './types'

const defaultState = {
  isLogin: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_LOGIN_STATUS:
      return { ...state, isLogin: action.value }
    default:
      return state
  }
}
