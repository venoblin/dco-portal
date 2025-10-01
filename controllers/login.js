const service = require('../services/login')

const login = async () => {
  try {
    if (process.env.AUTH_API) {
      await service.loginUser()
    } else if (
      process.env.USERNAME &&
      process.env.PASSWORD &&
      process.env.TOKEN
    ) {
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { login }
