const { Router } = require('express')
const controller = require('../../controllers/triages')

const router = Router()

router.get('/', controller.getAllTriages)
router.post('/', controller.postTriage)
router.get('/search', controller.getTriagesBySearch)
router.get('/:id', controller.getSingleTriage)
router.patch('/:id', controller.patchTriage)
router.delete('/:id', controller.deleteTriage)

module.exports = router
