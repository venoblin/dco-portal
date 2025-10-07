const repo = require('../repositories/triages')

const getAllTriages = async (req, res) => {
  try {
    const triages = await repo.getAllTriages()

    return res.status(200).json({ triages: triages })
  } catch {
    return res.status(500).json({ message: 'Failed to get all triages' })
  }
}

const getSingleTriage = async (req, res) => {
  try {
    const { id } = req.params
    const triage = await repo.getSingleTriage(id)

    return res.status(200).json({
      triage: triage
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get triage'
    })
  }
}

const patchTriage = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchTriage(id, req.body)

    if (count === 1) {
      const triage = await getSingleTriage(req, res)

      return res.status(201).json({
        triage: triage
      })
    } else {
      return res.status(404).json({
        message: 'Triage not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update triage'
    })
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

const deleteTriage = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteTriage(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted triage'
      })
    } else {
      return res.status(404).json({
        message: 'Triage not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete triage'
    })
  }
}

const getTriagesBySearch = async (req, res) => {
  try {
    const name = req.query.name

    if (!name || name === '') {
      const triages = await repo.getAllTriages({
        order: [['createdAt', 'DESC']]
      })

      return res.status(200).json({
        triages: triages
      })
    }

    const triages = await repo.getTriagesByName(name)

    return res.status(200).json({
      triages: triages
    })
  } catch {
    return res.status(500).json({
      message: 'Failed searching for triages'
    })
  }
}

module.exports = {
  getAllTriages,
  postTriage,
  getSingleTriage,
  patchTriage,
  deleteTriage,
  getTriagesBySearch
}
