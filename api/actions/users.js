const config = require('../config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.register = async function(req, res) {
  const curreEmail = await User.findOne({ email: req.body.data.email })
  if (curreEmail !== null) {
    return res.status(500).json({ message: 'Email already use'})
  }
  const currId = await User.findOne({ id: req.body.data.id })
  if (currId !== null) {
    return res.status(500).json({ message: 'ID already use' })
  }
  const user = new User({
    id: req.body.data.id,
    name: req.body.data.name,
    email: req.body.data.email,
    password: req.body.data.password
  })
  console.log(user)
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash
  console.log('3')
  //save user to db
  user.save(function(err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Error saving user record',
        error: err
      })
    }
    return res.json({
      message: 'user saved',
      _id: user._id
    })
  })
}

module.exports.login = [
  function(req, res) {
    console.log(req.body)
    User.findOne({ id: req.body.id }, function(err, user) {
      if (err) {
        return res.status(500).json({
          message: 'Error logging in',
          error: err
        })
      }

      if (user === null) {
        return res.status(500).json({
          message: 'Email address you entered is not found'
        })
      }

      //conpare password
      return bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
        if (isMatched === true) {
          console.log("login completed!")
          return res.json({
            user: {
              _id: user._id,
              id: user.id,
              email: user.email,
              name: user.name
            },
            token: jwt.sign({
              _id: user._id,
              id: user.id,
              email: user.email,
              name: user.name
            }, config.authSecret)
          })
        } else {
          return res.status(500).json({
            message: 'Invalid Email or Password entered'
          })
        }
      })
    })
  }
]

module.exports.user = function(req, res) {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decode) {
      if (err) {
        return res.status(401).json({ message: 'unauthorized' })
      } else {
        return res.json({ user: decode })
      }
    })
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}
