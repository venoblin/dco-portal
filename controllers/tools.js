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

    parsedData.forEach((d) => {
      d.description = d.description.replaceAll('\\n', '<br>')
      const arms = d.description.match(/ARM\d{10}/g)

      if (arms) {
        d.arms = arms
      } else {
        d.arms = null
      }
    })

    const verumUrl = `${process.env.DCO_PORTAL_VERUM_URL_START}${parsedData.cmdb_ci}${process.env.DCO_PORTAL_VERUM_URL_}`
    const verumRes = await fetch(verumUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${clientToken.toString('base64')}`,
        Accept: 'application/json'
      }
    })

    let device = null
    if (verumRes.totalCount === 0) {
      device = null
    } else if (verumRes.totalCount > 1) {
      device = getBestDevice(verumRes.verumObjectList)
    } else {
      device = verumRes.verumObjectList[0]
    }

    if (device) {
      parsedData.device = device
    }

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
