const { Router } = require('express')
const controller = require('../../controllers/devices')

const router = Router()

router.get('/', controller.getAllDevices)
router.post('/', controller.postDevice)
router.get('/:id', controller.getSingleDevice)
router.patch('/:id', controller.patchDevice)
router.delete('/:id', controller.deleteDevice)

module.exports = router
