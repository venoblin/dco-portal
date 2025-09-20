const { Guide } = require('../models')

const getAllGuides = async () => {
  const guides = await Guide.findAll()

  return guides
}

const postGuide = async (payload) => {
  const guide = await Guide.create({
    author: payload.author,
    title: payload.title,
    content: payload.content
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
  postGuide,
  deleteGuide
}
