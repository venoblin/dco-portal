const { Router } = require('express')
const controller = require('../../controllers/users')

const router = Router()

router.post('/', controller.postUser)

module.exports = router
