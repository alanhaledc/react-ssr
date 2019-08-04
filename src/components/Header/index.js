import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { actions } from './store'
import styles from './style.css'
import withStyle from '../../withStyle'

const mapState = state => ({
  isLogin: state.header.isLogin
})

const mapDispatch = dispatch => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  }
})

@withStyle(styles)
@connect(
  mapState,
  mapDispatch
)
class Header extends Component {
  render() {
    const { isLogin, handleLogout, handleLogin } = this.props

    return (
      <div className={styles.container}>
        <Link to="/" className={styles.item}>
          首页
        </Link>
        {isLogin ? (
          <Fragment>
            <Link to="translation" className={styles.item}>
              翻译列表
            </Link>
            <div onClick={handleLogout} className={styles.item}>
              退出
            </div>
          </Fragment>
        ) : (
          <div onClick={handleLogin} className={styles.item}>
            登录
          </div>
        )}
      </div>
    )
  }
}

export default Header
