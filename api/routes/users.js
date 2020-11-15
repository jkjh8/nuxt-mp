const config = require('../config')
const { Router } = require('express')

const router = Router()

const users = require('../actions/users')

router.post('/users/register', users.register)
router.post('/users/login', users.login)
router.get('/users/user', users.user)

module.exports = router
