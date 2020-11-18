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
const setup = require('./routes/setup')

app.use(user)
app.use(file)
app.use(play)
app.use(setup)

module.exports = {
  path: '/api',
  handler: app
}
