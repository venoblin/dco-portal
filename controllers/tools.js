const fs = require('fs/promises')
const { parseCsv } = require('../utils')
const { deviceLookup } = require('../services/devices')

const parseCsvFile = async (req, res) => {
  const snowBaseUrl = process.env.DCO_PORTAL_SNOW_BASE_URL
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

      const device = await deviceLookup(clientToken, incident.cmdb_ci)

      incident.device = device

      const rawArms = incident.description.match(/ARM\d{10}/g)
      incident.arms = null

      if (rawArms && rawArms.length > 0) {
        incident.arms = []

        rawArms.forEach((a) => {
          const newArm = {
            number: a,
            link: snowBaseUrl ? `${snowBaseUrl}${a}` : null
          }

          incident.arms.push(newArm)
        })
      }

      incident.incLink = snowBaseUrl
        ? `${snowBaseUrl}${incident.incident}`
        : null

      incident.taskLink = snowBaseUrl
        ? `${snowBaseUrl}${incident.number}`
        : null

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
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { parseCsvFile }
