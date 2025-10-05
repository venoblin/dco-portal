const { Router } = require('express')
const multer = require('multer')
const controller = require('../../controllers/tools')

const upload = multer({ dest: 'tmp/uploads/' })

const router = Router()

router.post('/parse-csv', upload.single('csvFile'), controller.parseCsvFile)
router.post('/find-devices', controller.findAllDevices)

module.exports = router
