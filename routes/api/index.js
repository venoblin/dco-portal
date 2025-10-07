const { Router } = require('express')
const guidesRoutes = require('./guides')
const triagesRoutes = require('./triages')
const toolsRoutes = require('./tools')

const router = Router()

router.use('/guides', guidesRoutes)
router.use('/triages', triagesRoutes)
router.use('/tools', toolsRoutes)

module.exports = router
