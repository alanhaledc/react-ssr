const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { news, translationNews } = require('./data')

const app = express()
const router = express.Router()
let isLogin = false

// secret 验证中间件
const secretValidator = (req, res, next) => {
  if (req.query.secret === '123456') {
    next()
  } else {
    res.json({
      success: false,
      msg: '验证码错误，请求信息失败'
    })
  }
}

// 登录验证器中间件
const loginValidator = (req, res, next) => {
  if (req.cookies.isLogin) {
    next()
  } else {
    res.json({
      success: false,
      msg: '未登录，请登录获取数据'
    })
  }
}

router.get('/isLogin', (req, res) => {
  res.json({
    success: true,
    data: { isLogin }
  })
})

router.get('/login', (req, res) => {
  isLogin = true
  res.cookie('isLogin', `login` + Date.now())
  res.json({
    success: true,
    data: { isLogin }
  })
})

router.get('/logout', (req, res) => {
  isLogin = false
  res.clearCookie('isLogin')
  res.json({
    success: true,
    data: { isLogin }
  })
})

router.get('/news', (req, res) => {
  res.json({
    success: true,
    data: news
  })
})

router.get('/translations', loginValidator, (req, res) => {
  res.json({
    success: true,
    data: translationNews
  })
})

app.use(cors()) // 跨域
app.use(cookieParser())
app.use('/ssr/api', secretValidator, router)

const PORT = process.env.PORT || 4500

app.listen(PORT, error => {
  if (error) throw error
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})
