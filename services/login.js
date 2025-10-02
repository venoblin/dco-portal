const qs = require('querystring')
const http = require('https')

const loginUser = async (req) => {
  const { username, password } = req.body

  const options = {
    method: 'POST',
    hostname: process.env.DCO_PORTAL_HOSTNAME,
    port: null,
    path: process.env.DCO_PORTAL_PATH,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    'cache-control': 'no-cache',
    'postman-token': process.env.DCO_PORTAL_POSTMAN_TOKEN
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
      client_id: process.env.DCO_PORTAL_CLIENT_ID,
      resource: process.env.DCO_PORTAL_RESOURCE,
      username: `NAEAST\\${username}`,
      password: password
    })
  )
  request.end()

  console.log(response)

  return response
}

module.exports = {
  loginUser
}
