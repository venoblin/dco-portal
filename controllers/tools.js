const fs = require('fs/promises')
const { parseCsv, getBestDevice } = require('../utils')

const parseCsvFile = async (req, res) => {
  const authHeader = req.headers.authorization
  const filePath = req.file ? req.file.path : null

  if (!authHeader || !authHeader.startsWith('Bearer ') || !filePath) {
    return res.status(401).json({ error: 'Missing token or file.' })
  }

  const clientToken = authHeader.split(' ')[1]

  try {
    const parsedData = await parseCsv(filePath)

    const enrichedDataPromises = parsedData.map(async (incident) => {
      incident.description = incident.description.replace(/\\n/g, '<br>')

      const verumUrl = `${process.env.DCO_PORTAL_VERUM_URL_START}${incident.cmdb_ci}${process.env.DCO_PORTAL_VERUM_URL_END}`

      const verumResponse = await fetch(verumUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${clientToken.toString('base64')}`,
          Accept: 'application/json'
        }
      })

      if (!verumResponse.ok) {
        console.log(verumResponse)

        throw new Error(
          `External API failed with status ${verumResponse.status}`
        )
      }
      const verumData = await verumResponse.json()

      let device = null
      if (verumData.totalCount > 1) {
        device = getBestDevice(verumData.verumObjectList)
      } else if (verumData.totalCount === 1) {
        device = verumData.verumObjectList[0]
      }

      incident.device = device
      incident.arms = incident.description.match(/ARM\d{10}/g)

      return incident
    })

    const finalData = await Promise.all(enrichedDataPromises)

    await fs.unlink(filePath)

    return res.status(200).json({
      data: finalData
    })
  } catch (error) {
    if (filePath) {
      await fs
        .unlink(filePath)
        .catch((err) => console.error('Failed to cleanup file:', err))
    }
    console.error('File processing failed:', error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { parseCsvFile }
