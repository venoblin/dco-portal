const qs = require('querystring')
const { requestPromise } = require('../utils')

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

  const postBody = qs.stringify({
    grant_type: 'password',
    client_id: process.env.DCO_PORTAL_CLIENT_ID,
    resource: process.env.DCO_PORTAL_RESOURCE,
    username: `NAEAST\\${username}`,
    password: password
  })

  const { body } = await requestPromise(options, postBody)

  const parsedBody = JSON.parse(body)
  return parsedBody
}

module.exports = {
  loginUser
}
