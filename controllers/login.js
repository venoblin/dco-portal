const service = require('../services/login')

const login = async (req, res) => {
  try {
    if (process.env.HOSTNAME) {
      const res = await service.loginUser(req)

      return res.status(200).json({
        data: {
          token: res.adfs_token,
          refreshToken: res.refresh_token,
          expiresAt: Date.now() / 1000 + res.expires_in
        }
      })
    } else {
      res.status(400).json({
        error: 'Invalid API url'
      })
    }
    res.status(400).json({
      error: 'Password or username incorrect'
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to login user'
    })
  }
}

module.exports = { login }
