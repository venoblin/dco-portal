const repo = require('../repositories/triages')

const getAllTriages = async (req, res) => {
  try {
    const triages = await repo.getAllTriages()

    return res.status(200).json({ triages: triages })
  } catch {
    return res.status(500).json({ message: 'Failed to get all triages' })
  }
}

const postTriage = async (req, res) => {
  try {
    const triage = await repo.postTriage(req.body)

    return res.status(201).json({
      triage: triage
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to create triage'
    })
  }
}

module.exports = {
  getAllTriages,
  postTriage
}
