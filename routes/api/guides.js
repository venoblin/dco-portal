const { Router } = require('express')
const controller = require('../../controllers/guides')

const router = Router()

router.get('/', controller.getAllGuides)
router.post('/', controller.postGuide)

module.exports = router
