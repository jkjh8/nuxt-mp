const config = require('../config')
const { Router } = require('express')

const router = Router()

const files = require('../actions/files')

router.get('/files/filelist', files.getfilelist)

module.exports = router
