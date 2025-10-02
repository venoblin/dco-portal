const { filterHeaders } = require('../utils')
const qs = require('querystring')
const http = require('https')

const loginUser = async (req) => {
  const { username, password } = req.body

  const excludedHeaders = [
    'content-encoding',
    'content-length',
    'transfer-encoding',
    'connection'
  ]

  const options = {
    method: 'POST',
    hostname: process.env.HOSTANME,
    port: null,
    path: process.env.PATH,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    'cache-control': 'no-cache',
    'postman-token': process.env.POSTMAN_TOKEN
  }

  let response
  const request = http.request(options, function (res) {
    const chunks = []

    res.on('data', function (chunk) {
      chunks.push(chunk)
    })
    res.on('end', function () {
      const body = Buffer.concat(chunks)
      response = body
    })
  })

  request.write(
    qs.stringify({
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      resource: process.env.RESOURCE,
      username: `NAEAST\\${username}`,
      password: password
    })
  )
  request.end()

  // const headers = filterHeaders(res.raw.headers, excludedHeaders)

  return response
}

module.exports = {
  loginUser
}
