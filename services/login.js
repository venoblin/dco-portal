const qs = require('querystring')
const { filterHeaders } = require('../utils')

const loginUser = async (req) => {
  const { username, password } = req.body
  const authApiUrl = `https://${process.env.HOSTNAME}${process.env.PATH}`

  const excludedHeaders = [
    'content-encoding',
    'content-length',
    'transfer-encoding',
    'connection'
  ]

  const bodyString = qs.stringify({
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    resource: process.env.RESOURCE,
    username: `NAEAST\\${username}`,
    password: password
  })

  const externalResponse = await fetch(authApiUrl, {
    method: 'POST',
    body: bodyString,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'manual'
  })

  const externalHeaders = filterHeaders(
    externalResponse.headers.raw(),
    excludedHeaders
  )
  const externalStatus = externalResponse.status

  if (externalStatus >= 300 && externalStatus < 400) {
    return {
      success: false,
      message: `External service redirect (${externalStatus})`,
      headers: externalHeaders
    }
  }

  const content = await externalResponse.json().catch(() => null)

  return {
    content: content,
    statusCode: externalStatus,
    headers: externalHeaders,
    success: true
  }
}

module.exports = {
  loginUser
}
