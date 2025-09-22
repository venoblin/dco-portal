const { User } = require('../models')

const exports = {}

exports.postUser = async (payload) => {
  const user = await User.create({
    username: payload.username,
    password: payload.password
  })

  return user
}

exports.patchUser = async (id, payload) => {
  const [count] = await User.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

exports.deleteUser = async (id) => {
  const count = await User.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = exports
