const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '/.env') })

const config = { authSecret: process.env.SECRET }

module.exports = config

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'unauthorized' })
      } else {
        return next()
      }
    })
  } else {
    return res.status(401).json({ message: unauthorized })
  }
}
