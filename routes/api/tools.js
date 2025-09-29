const { Router } = require('express')
const { parseCsv } = require('../../utils')

const router = Router()

router.post('/parse-csv', (req, res) => {
  const { file } = req.body

  console.log(file)
  return file
})

module.exports = router
