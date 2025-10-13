const { Router } = require('express')
const guidesRoutes = require('./guides')
const triagesRoutes = require('./triages')
const devicesRoutes = require('./devices')
const toolsRoutes = require('./tools')

const router = Router()

router.use('/guides', guidesRoutes)
router.use('/triages', triagesRoutes)
router.use('/devices', devicesRoutes)
router.use('/tools', toolsRoutes)

module.exports = router
