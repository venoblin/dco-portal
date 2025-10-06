const service = require('../services/login')

const login = async (req, res) => {
  try {
    if (process.env.DCO_PORTAL_HOSTNAME) {
      const authRes = await service.loginUser(req)

      return res.status(200).json({
        data: {
          accessToken: authRes.access_token,
          refreshToken: authRes.refresh_token,
          expiresAt: Date.now() / 1000 + authRes.expires_in
        }
      })
    } else if (
      process.env.DEV_USERNAME &&
      process.env.DEV_PASSWORD &&
      process.env.DEV_ACCESS_TOKEN
    ) {
      if (
        process.env.DEV_USERNAME.toLowerCase() ===
          req.body.username.toLowerCase() &&
        process.env.DEV_PASSWORD === req.body.password
      ) {
        return res.status(200).json({
          data: {
            accessToken: process.env.DEV_ACCESS_TOKEN,
            refreshToken: `REFRESH_${process.env.DEV_ACCESS_TOKEN}`,
            expiresAt: Date.now() * 1000
          }
        })
      }
    }

    return res.status(400).json({
      message: 'Credentials are incorrect or not present'
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to login user'
    })
  }
}

module.exports = { login }
