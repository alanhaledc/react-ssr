import * as types from './types'

const defaultState = {
  translationList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_TRANSLATION_LIST:
      return { ...state, translationList: action.list }
    default:
      return state
  }
}
