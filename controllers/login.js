const service = require('../services/login')

const login = async (req, res) => {
  try {
    if (process.env.DCO_PORTAL_HOSTNAME) {
      const authRes = await service.loginUser(req)

      res.status(200).json({
        data: {
          accessToken: authRes.access_token,
          refreshToken: authRes.refresh_token,
          expiresAt: Date.now() / 1000 + authRes.expires_in
        }
      })
    } else if (process.env.DEV_ACCESS_TOKEN) {
      res.status(200).json({
        data: {
          accessToken: process.env.DEV_ACCESS_TOKEN,
          refreshToken: `REFRESH_${process.env.DEV_ACCESS_TOKEN}`,
          expiresAt: Date.now() * 1000
        }
      })
    }

    res.status(400).json({
      error: 'Credentials'
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to login user'
    })
  }
}

module.exports = { login }
