const fs = require('fs')
const { parseCsv } = require('../utils')

const parseCsvFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' })
  }

  const filePath = req.file.path

  try {
    const parsedData = await parseCsv(filePath)

    fs.unlinkSync(filePath)

    return res.status(200).json({
      data: parsedData
    })
  } catch (error) {
    fs.unlinkSync(filePath)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { parseCsvFile }
