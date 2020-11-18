const config = require('../config')
const { Router } = require('express')

const router = Router()
const Setup = require('../actions/setup')

router.get('/setup', Setup.getSetup)
router.post('/setup', Setup.postSetup)
router.get('/setup/playid/:list/:id', Setup.playid)
router.get('/setup/playli/:id', Setup.playli)
router.get('/setup/stop', Setup.stop)

module.exports = router
