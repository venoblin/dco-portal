const { Router } = require('express')
const guidesRoutes = require('./guides')
const toolsRoutes = require('./tools')

const router = Router()

router.use('/guides', guidesRoutes)
router.use('/tools', toolsRoutes)

module.exports = router
