const fs = require('fs/promises')
const { parseCsv } = require('../utils')
const { deviceLookup } = require('../services/devices')

const parseCsvFile = async (req, res) => {
  const snowBaseUrl = process.env.DCO_PORTAL_SNOW_BASE_URL
  const authHeader = req.headers.authorization
  const filePath = req.file ? req.file.path : null

  if (!authHeader || !authHeader.startsWith('Bearer ') || !filePath) {
    return res.status(401).json({ error: 'Missing token or file' })
  }

  const clientToken = authHeader.split(' ')[1]

  try {
    const parsedData = await parseCsv(filePath)

    const enrichedDataPromises = parsedData.map(async (incident) => {
      incident.description = incident.description.replaceAll('\n', '<br>')

      const startDateRegex = /(\d{1,2})\/(\d{1,2}) @ (\d{4})/
      const shortDescriptionMatch =
        incident.short_description.match(startDateRegex)

      if (shortDescriptionMatch) {
        incident.startDate = shortDescriptionMatch[0]
      } else {
        incident.startDate = incident.description.match(startDateRegex)
      }

      const device = await deviceLookup(clientToken, {
        assetName: incident.cmdb_ci
      })

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
      incidents: finalData
    })
  } catch {
    if (filePath) {
      await fs
        .unlink(filePath)
        .catch((err) => console.error('Failed to cleanup file:', err))
    }
    return res.status(500).json({ message: 'Failed to parse CSV file' })
  }
}

const findAllDevices = async (req, res) => {
  try {
    const { queriesArr } = req.body
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ') || !queriesArr) {
      return res.status(401).json({ error: 'Missing token or devices payload' })
    }

    const clientToken = authHeader.split(' ')[1]

    const devicePromises = queriesArr.map(async (query) => {
      const device = await deviceLookup(clientToken, query)

      const newDevice = { ...query }

      if (device) {
        newDevice.info = device
      } else {
        newDevice.info = {
          assetName: query,
          assetTag: 'Not Found',
          invNo: 'Not Found',
          deployment: {
            rack: 'Not Found',
            zPosition: 'Not Found'
          },
          subStatus: 'Not Found',
          serialNo: 'Not Found',
          model: 'Not Found',
          catalogID: 'Not Found'
        }
      }

      return newDevice
    })

    const finalData = await Promise.all(devicePromises)

    return res.status(200).json({ devices: finalData })
  } catch {
    return res.status(500).json({ message: 'Failed to find devices' })
  }
}

module.exports = {
  parseCsvFile,
  findAllDevices
}
