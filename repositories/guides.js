const { Guide } = require('../models')

const getAllGuides = async () => {
  const res = await Guide.findAll()

  return res
}

module.exports = {
  getAllGuides
}
