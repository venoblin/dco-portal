const { Router } = require('express')
const loginRoutes = require('./login')

const router = Router()

router.use('/login', loginRoutes)

module.exports = router
