const express = require('express')
const db = require('./db')

const app = express()

//body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const user = require('./routes/users')
const file = require('./routes/files')

app.use(user)
app.use(file)

module.exports = {
  path: '/api',
  handler: app
}
