const service = require('../services/login')

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    if (process.env.AUTH_API) {
      await service.loginUser(username, password)
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
