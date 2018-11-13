import { CHANGE_TRANSLATION_LIST } from './constants'

const changeTranslationList = value => ({
  type: CHANGE_TRANSLATION_LIST,
  value
})


export const getTranslationList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/translations.json')
      .then(res => {
        if (res.data.success) {
          const list = res.data.data
          dispatch(changeTranslationList(list))
        } else {
          const list = []
          dispatch(changeTranslationList(list))
        }
      })
  }
}