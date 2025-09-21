const { Guide } = require('../models')

const getAllGuides = async () => {
  const guides = await Guide.findAll()

  return guides
}

const getSingleGuide = async (id) => {
  const guide = await Guide.findByPk(id)

  return guide
}

const patchGuide = async (id, payload) => {
  const [count] = await Guide.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postGuide = async (payload) => {
  const guide = await Guide.create({
    author: payload.author,
    title: payload.title,
    content: payload.content,
    shortDescription: payload.shortDescription
  })

  return guide
}

const deleteGuide = async (id) => {
  const count = await Guide.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = {
  getAllGuides,
  getSingleGuide,
  patchGuide,
  postGuide,
  deleteGuide
}
