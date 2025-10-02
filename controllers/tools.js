const fs = require('fs')
const { parseCsv } = require('../utils')

const parseCsvFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' })
  }

  const filePath = req.file.path

  try {
    const parsedData = await parseCsv(filePath)

    parsedData.forEach((d) => {
      d.description = d.description.replaceAll('\\n', '<br>')
      const arms = d.description.match(/ARM\d{10}/g)

      if (arms) {
        d.arms = arms
      } else {
        d.arms = null
      }
    })

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
