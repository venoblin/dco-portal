require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./models')
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 3000
const frontendPath = path.join(__dirname, 'frontend/dist')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(frontendPath))

app.use('/api', apiRoutes)
app.use('/auth', authRoutes)

app.get('/*web', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

app.listen(PORT, async () => {
  await db.sequelize.sync()
  console.log('Started on port: ' + PORT)
})
