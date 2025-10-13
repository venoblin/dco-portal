const { Router } = require('express')
const controller = require('../../controllers/paths')

const router = Router()

router.get('/', controller.getAllPaths)
router.post('/', controller.postPath)
router.get('/:id', controller.getSinglePath)
router.patch('/:id', controller.patchPath)
router.delete('/:id', controller.deletePath)

module.exports = router
