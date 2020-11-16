const config = require('../config')
const { Router } = require('express')

const router = Router()

const files = require('../actions/files')

router.get('/files/filelist', files.getfilelist)
router.post('/files/upload', files.upload)
router.get('/files/refresh', files.refresh)
router.post('/files/del', files.del)
router.get('/files/preview/:filename', files.preview)

module.exports = router
