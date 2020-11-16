const express = require('express')
const fileupload = require('express-fileupload')
const db = require('./db')

const app = express()

//body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())

const user = require('./routes/users')
const file = require('./routes/files')
const play = require('./routes/play')

app.use(user)
app.use(file)
app.use(play)

module.exports = {
  path: '/api',
  handler: app
}
