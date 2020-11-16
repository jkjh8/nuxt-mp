const config = require('../config')
const { Router } = require('express')

const router = Router()

const playlist = require('../actions/playlist')

router.get('/playlist/:id', playlist.getplaylist)
router.post('/playlist', playlist.postplaylist)

module.exports = router
