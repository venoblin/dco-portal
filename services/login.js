const qs = require('querystring')
const http = require('https')

const loginUser = async (req) => {
  const { username, password } = req.body

  console.log(
    process.env.DCO_PORTAL_HOSTNAME,
    process.env.DCO_PORTAL_PATH,
    process.env.DCO_PORTAL_POSTMAN_TOKEN,
    process.env.DCO_PORTAL_CLIENT_ID,
    process.env.DCO_PORTAL_RESOURCE
  )

  console.log('username', username, 'password', password)

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
      console.log('Body', body.toString())
      response = body.toString()
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

  return response
}

module.exports = {
  loginUser
}
