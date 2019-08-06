import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { actions } from './store/'
import styles from './style.css'
import withStyle from '../../withStyle'

const mapStateToProps = state => ({
  newsList: state.home.newsList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(actions.getHomeList())
  }
})

const Home = ({ newsList, getHomeList, staticContext }) => {
  withStyle(staticContext, styles)

  useEffect(() => {
    if (!newsList.length) {
      getHomeList()
    }
  }, [newsList.length])

  const getList = () =>
    newsList.map(item => (
      <div className={styles.item} key={item.id}>
        {item.title}
      </div>
    ))

  return (
    <>
      <Helmet>
        <title>这是一个SSR新闻页面 - 丰富多彩的资讯</title>
        <meta name="description" content="这是一个SSR新闻页面" />
      </Helmet>
      <div className={styles.container}>{getList()}</div>
    </>
  )
}

// 这个函数负责在服务器渲染之前，把这个路由需要的数据提前加载好
// 返回一个 promise 对象
Home.loadData = store => store.dispatch(actions.getHomeList())

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
