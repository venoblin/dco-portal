const { Router } = require('express')
const controller = require('../../controllers/guides')

const router = Router()

router.get('/', controller.getAllGuides)
router.get('/:id', controller.getSingleGuide)
router.post('/', controller.postGuide)
router.delete('/:id', controller.deleteGuide)

module.exports = router
