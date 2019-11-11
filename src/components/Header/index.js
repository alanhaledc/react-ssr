import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { actions } from './store'
import styles from './style.scss'
import withStyle from '../../withStyle'

const mapStateToProps = state => ({
  isLogin: state.header.isLogin
})

const mapDispatchToProps = dispatch => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  }
})

const Header = ({ isLogin, handleLogout, handleLogin, staticContext }) => {
  withStyle(staticContext, styles)

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.item}>
        首页
      </Link>
      {isLogin ? (
        <>
          <Link to="/translation" className={styles.item}>
            翻译列表
          </Link>
          <div onClick={handleLogout} className={styles.item}>
            退出
          </div>
        </>
      ) : (
        <div onClick={handleLogin} className={styles.item}>
          登录
        </div>
      )}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
