import { CHANGE_IS_LOGIN } from './constants'

const defaultState = {
  isLogin: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_IS_LOGIN:
      return { ...state, isLogin: action.value }
    default:
      return state
  }
}