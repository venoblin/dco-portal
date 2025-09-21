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

const patchGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchGuide(id, req.body)

    if (count === 1) {
      const guide = await getSingleGuide(req, res)

      res.status(201).json({
        guide: guide
      })
    } else {
      res.status(404).json({
        error: 'Guide not found'
      })
    }
  } catch {
    res.status(500).json({
      error: 'Failed to create guide'
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
        message: 'Successfully deleted guide'
      })
    } else {
      res.status(404).json({
        error: 'Guide not found'
      })
    }
  } catch {
    res.status(500).json({
      error: 'Failed to delete user'
    })
  }
}

const getBySearch = async (req, res) => {
  try {
    const title = req.query.title

    if (title === '') {
      const guides = await repo.getAllGuides()

      res.status(200).json({
        guides: guides
      })
    }

    const guides = await repo.getGuideByTitle(title)

    res.status(200).json({
      guides: guides
    })
  } catch {
    res.status(500).json({
      error: 'Failed searching for guides'
    })
  }
}

module.exports = {
  getAllGuides,
  getSingleGuide,
  patchGuide,
  postGuide,
  deleteGuide,
  getBySearch
}
