const { User } = require('../models')

const exports = {}

exports.findUserById = async (id) => {
  const user = await User.findByPk(id)

  return user
}

exports.createUser = async (payload) => {
  const user = await User.create({
    username: payload.username,
    password: payload.password
  })

  return user
}

exports.updateUser = async (id, payload) => {
  const [count] = await User.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

exports.destroyUser = async (id) => {
  const count = await User.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = exports
