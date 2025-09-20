require('dotenv').config()
const cors = require('cors')
const express = require('express')
const apiRoutes = require('./routes/api')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log('Started on port: ' + PORT)
})
