const { filterHeaders, forwardAuthRequest } = require('../utils')
const authApi = process.env.AUTH_API

const loginUser = async (req) => {
  const excludedHeaders = [
    'content-encoding',
    'content-length',
    'transfer-encoding',
    'connection'
  ]

  const res = await forwardAuthRequest(req, authApi)

  const headers = filterHeaders(res.raw.headers, excludedHeaders)

  return { content: res.content, statusCode: res.status_code, headers: headers }
}

module.exports = {
  loginUser
}
