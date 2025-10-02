const { filterHeaders } = require('../utils')

const loginUser = async (req) => {
  const { username, password } = req.body

  const bodyString = `${
    process.env.GRANT_BEGINNING
  }${username}&password=${encodeURIComponent(password)}${process.env.GRANT_END}`

  const authApi = process.env.AUTH_API
  const res = await fetch(authApi, {
    method: 'POST',
    body: bodyString,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'manual'
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
