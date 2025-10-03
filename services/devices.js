const { getBestDevice } = require('../utils')

const deviceLookup = async (clientToken, hostname) => {
  if (
    !process.env.DCO_PORTAL_VERUM_URL_START ||
    !process.env.DCO_PORTAL_VERUM_URL_END
  ) {
    return null
  }

  const verumUrl = `${process.env.DCO_PORTAL_VERUM_URL_START}${hostname}${process.env.DCO_PORTAL_VERUM_URL_END}`

  const verumResponse = await fetch(verumUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${clientToken.toString('base64')}`,
      Accept: 'application/json'
    }
  })

  if (!verumResponse.ok) {
    throw new Error(`External API failed with status ${verumResponse.status}`)
  }
  const verumData = await verumResponse.json()

  let device = null
  if (verumData.totalCount > 1) {
    device = getBestDevice(verumData.verumObjectList)
  } else if (verumData.totalCount === 1) {
    device = verumData.verumObjectList[0]
  }

  return device
}

module.exports = { deviceLookup }
