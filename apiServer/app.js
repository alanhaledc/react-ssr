const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const logger = require('koa-logger')
const path = require('path')
const fs = require('fs')

const translationsData = require('./translations')

const app = new Koa()
const router = new Router({prefix: '/ssr'})

app.use(serve(path.join(__dirname, 'static')))
app.use(logger())

router.get('/api/login.json', async ctx => {
  fs.writeFileSync('./static/ssr/api/isLogin.json', '{"success":true,"data": {"isLogin": true}}', 'utf-8')
  ctx.cookies.set('isLogin', true, {
    path: '/',
    maxAge: 86400000,
    httpOnly: false
  })
  ctx.body = fs.readFileSync('./static/ssr/api/isLogin.json', 'utf-8')
})

router.get('/api/logout.json', async ctx => {
  fs.writeFileSync('./static/ssr/api/isLogin.json', '{"success":true,"data": {"isLogin": false}}', 'utf-8')
  ctx.cookies.set('isLogin', '', {
    path: '/',
    maxAge: -1
  })
  ctx.body = {
    success: true,
    data: {
      logout: true
    }
  }
})

router.get('/api/translations.json', async ctx => {
  const data = await fs.readFileSync('./static/ssr/api/isLogin.json', 'utf-8')
  const isLogin = JSON.parse(data).data.isLogin
  if (!isLogin) {
    ctx.body = {
      success: false
    }
  } else {
    ctx.body = {
      success: true,
      data: translationsData
    }
  }
})

app.use(router.routes()).use(router.allowedMethods())

const PORT = 4500

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server starting at port: ${PORT}!`)
})