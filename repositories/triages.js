const { Triage } = require('../models')

const getAllTriages = async (options) => {
  let triages
  if (options) {
    triages = await Triage.findAll(options)
  } else {
    triages = await Triage.findAll()
  }

  return triages
}

const postTriage = async (payload) => {
  const triage = await Triage.create({
    name: payload.name,
    rack: payload.rack
  })

  return triage
}

module.exports = {
  getAllTriages,
  postTriage
}
