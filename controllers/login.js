const service = require('../services/login')

const login = async (req, res) => {
  try {
    const res = await service.loginUser(req)

    console.log(res)

    res.status(200).json({
      data: {
        token: res.access_token,
        refreshToken: res.refresh_token,
        expiresAt: Date.now() / 1000 + res.expires_in
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to login user'
    })
  }
}

module.exports = { login }
