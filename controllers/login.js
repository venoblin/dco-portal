const service = require('../services/login')

const login = async (req, res) => {
  try {
    const authRes = await service.loginUser(req)
    console.log(authRes)

    res.status(200).json({
      data: {
        accessToken: authRes.access_token,
        refreshToken: authRes.refresh_token,
        expiresAt: Date.now() / 1000 + authRes.expires_in
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to login user'
    })
  }
}

module.exports = { login }
