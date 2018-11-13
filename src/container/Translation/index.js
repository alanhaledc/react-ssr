import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { actions } from './store'
import withStyle from '../../withStyle'
import styles from '../Translation/style.css'
import { Helmet } from 'react-helmet'

const mapState = state => ({
  translationList: state.translation.translationList,
  isLogin: state.header.isLogin
})

const mapDispatch = dispatch => ({
  getTranslationList() {
    dispatch(actions.getTranslationList())
  }
})

@withStyle(styles)
@connect(mapState, mapDispatch)
class Translation extends Component {

  render() {
    const { translationList, isLogin } = this.props

    return (
      <Fragment>
        <Helmet>
          <title>这是一个SSR翻译页面 - 丰富多彩的资讯</title>
          <meta name="description" content="这是一个SSR翻译页面" />
        </Helmet>
        <div className={ styles.container }>
          {
            isLogin
              ? translationList.map(item => (
                <div className={ styles.item } key={ item.id }>{ item.title }</div>
              ))
              : <Redirect to="/" />
          }
        </div>
      </Fragment>
    )
  }

  componentDidMount() {
    this.props.getTranslationList()
  }
}

Translation.loadData = store => {
  return store.dispatch(actions.getTranslationList())
}

export default Translation