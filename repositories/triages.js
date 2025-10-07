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

module.exports = {
  getAllTriages
}
