const qs = require('querystring')
const http = require('https')

const loginUser = async (req) => {
  const { username, password } = req.body

  console.log(
    process.env.HOSTNAME,
    process.env.PATH,
    process.env.POSTMAN_TOKEN,
    process.env.CLIENT_ID,
    process.env.RESOURCE
  )

  console.log('username', username, 'password', password)

  const options = {
    method: 'POST',
    hostname: process.env.HOSTNAME,
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
      console.log('Body', body)
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

  return response
}

module.exports = {
  loginUser
}
