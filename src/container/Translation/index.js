import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { actions } from './store'
import withStyle from '../../withStyle'
import styles from '../Translation/style.css'
import { Helmet } from 'react-helmet'

const mapStateToProps = state => ({
  translationList: state.translation.translationList,
  isLogin: state.header.isLogin
})

const mapDispatchToProps = dispatch => ({
  getTranslationList() {
    dispatch(actions.getTranslationList())
  }
})

const Translation = ({
  isLogin,
  translationList,
  getTranslationList,
  staticContext
}) => {
  withStyle(staticContext, styles)

  useEffect(() => {
    if (!translationList.length) {
      getTranslationList()
    }
  }, [translationList.length])

  return (
    <>
      <Helmet>
        <title>这是一个SSR翻译页面 - 丰富多彩的资讯</title>
        <meta name="description" content="这是一个SSR翻译页面" />
      </Helmet>
      <div className={styles.container}>
        {isLogin ? (
          translationList.map(item => (
            <div className={styles.item} key={item.id}>
              {item.title}
            </div>
          ))
        ) : (
          <Redirect to="/" />
        )}
      </div>
    </>
  )
}

Translation.loadData = store => store.dispatch(actions.getTranslationList())

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translation)
