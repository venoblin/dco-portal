const { Op } = require('sequelize')
const { User } = require('../models')

const getAllUsers = async (options) => {
  let users
  if (options) {
    users = await User.findAll(options)
  } else {
    users = await User.findAll()
  }

  return users
}

const getSingleUser = async (id) => {
  const user = await User.findByPk(id)

  return user
}

const patchUser = async (id, payload) => {
  const [count] = await User.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postUser = async (payload) => {
  const user = await User.create({
    author: payload.author,
    title: payload.title,
    content: payload.content,
    shortDescription: payload.shortDescription
  })

  return user
}

const deleteUser = async (id) => {
  const count = await User.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = {
  getAllUsers,
  getSingleUser,
  patchUser,
  postUser,
  deleteUser
}
