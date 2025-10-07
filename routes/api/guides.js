const { Router } = require('express')
const controller = require('../../controllers/guides')

const router = Router()

router.get('/', controller.getAllGuides)
router.get('/search', controller.getGuidesBySearch)
router.get('/:id', controller.getSingleGuide)
router.patch('/:id', controller.patchGuide)
router.post('/', controller.postGuide)
router.delete('/:id', controller.deleteGuide)

module.exports = router
