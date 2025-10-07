const repo = require('../repositories/triages')

const getAllTriages = async (req, res) => {
  try {
    const triages = await repo.getAllTriages()

    return res.status(200).json({ triages: triages })
  } catch {
    return res.status(500).json({ message: 'Failed to get all triages' })
  }
}

module.exports = {
  getAllTriages
}
