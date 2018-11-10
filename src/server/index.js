import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { render } from './utils'

const app = express()
app.use(express.static('public'))


app.get('*', function (req, res) {
  res.send(render(req))
})

app.listen(3000)