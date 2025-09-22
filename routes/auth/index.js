const { Router } = require('express')
const registerRoutes = require('./register')
const loginRoutes = require('./login')

const router = Router()

router.use('/register', registerRoutes)
router.use('/login', loginRoutes)

module.exports = router
