const { Router } = require('express')
const controller = require('../../controllers/triages')

const router = Router()

router.get('/', controller.getAllTriages)
router.post('/', controller.postTriage)

module.exports = router
