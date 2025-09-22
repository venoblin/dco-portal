const { Op } = require('sequelize')
const { Guide } = require('../models')

const funcs = {}

funcs.findAllGuides = async (options) => {
  let guides
  if (options) {
    guides = await Guide.findAll(options)
  } else {
    guides = await Guide.findAll()
  }

  return guides
}

funcs.findSingleGuide = async (id) => {
  const guide = await Guide.findByPk(id)

  return guide
}

funcs.updateGuide = async (id, payload) => {
  const [count] = await Guide.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

funcs.createGuide = async (payload) => {
  const guide = await Guide.create({
    author: payload.author,
    title: payload.title,
    content: payload.content,
    shortDescription: payload.shortDescription
  })

  return guide
}

funcs.destroyGuide = async (id) => {
  const count = await Guide.destroy({
    where: {
      id: id
    }
  })

  return count
}

funcs.findGuideByTitle = async (title) => {
  const guide = await Guide.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`
      }
    }
  })

  return guide
}

module.exports = funcs
