const { Router } = require('express')
const guidesRoutes = require('./guides')

const router = Router()

router.use('/guides', guidesRoutes)

module.exports = router
