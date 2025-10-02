const { filterHeaders } = require('../utils')

const loginUser = async (username, password) => {
  const authApi = process.env.AUTH_API
  const res = await fetch(authApi, {
    method: 'POST',
    body: `${
      process.env.GRANT_BEGINNING
    }${username}&password=${encodeURIComponent(password)}${
      process.env.GRANT_END
    }`
  })

  const excludedHeaders = [
    'content-encoding',
    'content-length',
    'transfer-encoding',
    'connection'
  ]

  const headers = filterHeaders(res.raw.headers, excludedHeaders)

  return { content: res.content, statusCode: res.status_code, headers: headers }
}

module.exports = {
  loginUser
}
