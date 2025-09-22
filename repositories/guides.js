const { Op } = require('sequelize')
const { Guide } = require('../models')

const exports = {}

exports.getAllGuides = async (options) => {
  let guides
  if (options) {
    guides = await Guide.findAll(options)
  } else {
    guides = await Guide.findAll()
  }

  return guides
}

exports.getSingleGuide = async (id) => {
  const guide = await Guide.findByPk(id)

  return guide
}

exports.patchGuide = async (id, payload) => {
  const [count] = await Guide.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

exports.postGuide = async (payload) => {
  const guide = await Guide.create({
    author: payload.author,
    title: payload.title,
    content: payload.content,
    shortDescription: payload.shortDescription
  })

  return guide
}

exports.deleteGuide = async (id) => {
  const count = await Guide.destroy({
    where: {
      id: id
    }
  })

  return count
}

exports.getGuideByTitle = async (title) => {
  const guide = await Guide.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`
      }
    }
  })

  return guide
}

module.exports = exports
