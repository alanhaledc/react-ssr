import { CHANGE_HOME_LIST } from './constants'

const defaultState = {
  newsList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_HOME_LIST:
      return { ...state, newsList: action.data }
    default:
      return state
  }
}