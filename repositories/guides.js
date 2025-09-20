const { Guide } = require('../models')

const getAllGuides = async () => {
  const res = await Guide.findAll()

  return res
}

const postGuide = async (payload) => {
  const res = await Guide.create({
    author: payload.author,
    title: payload.title,
    content: payload.content
  })

  return res
}

module.exports = {
  getAllGuides,
  postGuide
}
