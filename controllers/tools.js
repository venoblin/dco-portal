const fs = require('fs')
const { parseCsv, getBestDevice } = require('../utils')

const parseCsvFile = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing.' })
  }

  const clientToken = authHeader.split(' ')[1]

  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' })
  }

  const filePath = req.file.path

  try {
    const parsedData = await parseCsv(filePath)

    parsedData.forEach(async (incident) => {
      incident.description = incident.description.replaceAll('\\n', '<br>')
      const arms = incident.description.match(/ARM\d{10}/g)
      const verumUrl = `${process.env.DCO_PORTAL_VERUM_URL_START}${incident.cmdb_ci}${process.env.DCO_PORTAL_VERUM_URL_}`
      const verumRes = await fetch(verumUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: 'application/json'
        }
      })
      const verumData = JSON.parse(verumRes)

      let device = null
      if (verumData.totalCount === 0) {
        device = null
      } else if (verumData.totalCount > 1) {
        device = getBestDevice(verumData.verumObjectList)
      } else {
        device = verumData.verumObjectList[0]
      }

      if (device) {
        incident.device = device
      }

      if (arms) {
        incident.arms = arms
      } else {
        incident.arms = null
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
