import * as types from './types'

const changeTranslationList = list => ({
  type: types.CHANGE_TRANSLATION_LIST,
  list
})

export const getTranslationList = () => (dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/translations').then(res => {
    if (res.data.success) {
      const list = res.data.data
      dispatch(changeTranslationList(list))
    } else {
      const list = []
      dispatch(changeTranslationList(list))
    }
  })
