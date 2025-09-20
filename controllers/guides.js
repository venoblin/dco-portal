const repo = require('../repositories/guides')

const getAllGuides = async (req, res) => {
  try {
    const guides = await repo.getAllGuides()

    res.status(200).json({
      guides: guides
    })
  } catch {
    res.status(500).json({
      error: 'Failed to get all guides'
    })
  }
}

const getSingleGuide = async (req, res) => {
  try {
    const { id } = req.params
    const guide = await repo.getSingleGuide(id)

    res.status(200).json({
      guide: guide
    })
  } catch {
    res.status(500).json({
      error: 'Failed to get guide'
    })
  }
}

const postGuide = async (req, res) => {
  try {
    const guide = await repo.postGuide(req.body)

    res.status(201).json({
      guide: guide
    })
  } catch {
    res.status(500).json({
      error: 'Failed to create guide'
    })
  }
}

const deleteGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteGuide(id)

    if (count === 1) {
      res.status(200).json({
        message: 'Successfully deleted user'
      })
    } else {
      res.status(404).json({
        error: 'User not found'
      })
    }
  } catch {
    res.status(500).json({
      error: 'Failed to delete user'
    })
  }
}

module.exports = {
  getAllGuides,
  getSingleGuide,
  postGuide,
  deleteGuide
}
