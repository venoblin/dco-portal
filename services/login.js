const loginUser = async (username, password) => {
  const authApi = process.env.AUTH_API
  const res = await fetch(authApi, {
    method: 'POST',
    body: `${
      process.env.GRANT_BEGINNING
    }${username}&password=${encodeURIComponent(password)}${
      process.env.GRANT_END
    }`
  })

  const excludedHeader = [
    'content-encoding',
    'content-length',
    'transfer-encoding',
    'connection'
  ]

  return res
}

module.exports = {
  loginUser
}
