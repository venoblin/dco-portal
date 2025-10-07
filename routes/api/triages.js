const { Router } = require('express')
const controller = require('../../controllers/triages')

const router = Router()

router.get('/', controller.getAllTriages)

module.exports = router
