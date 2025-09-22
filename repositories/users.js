const { User } = require('../models')

const funcs = {}

funcs.findUserById = async (id) => {
  const user = await User.findByPk(id)

  return user
}

funcs.createUser = async (payload) => {
  const user = await User.create({
    username: payload.username,
    password: payload.password
  })

  return user
}

funcs.updateUser = async (id, payload) => {
  const [count] = await User.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

funcs.destroyUser = async (id) => {
  const count = await User.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = funcs
