const { Router } = require('express')
const controller = require('../../controllers/hops')

const router = Router()

router.get('/', controller.getAllHops)
router.post('/', controller.postHop)
router.get('/:id', controller.getSingleHop)
router.patch('/:id', controller.patchHop)
router.delete('/:id', controller.deleteHop)

module.exports = router
