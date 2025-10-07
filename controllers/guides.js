const repo = require('../repositories/guides')

const getAllGuides = async (req, res) => {
  try {
    const limit = req.query.limit
    const options = {
      order: [['createdAt', 'DESC']]
    }

    if (limit) {
      options.limit = limit
    }

    const guides = await repo.getAllGuides(options)

    return res.status(200).json({
      guides: guides
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get all guides'
    })
  }
}

const getSingleGuide = async (req, res) => {
  try {
    const { id } = req.params
    const guide = await repo.getSingleGuide(id)

    return res.status(200).json({
      guide: guide
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get guide'
    })
  }
}

const patchGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchGuide(id, req.body)

    if (count === 1) {
      const guide = await getSingleGuide(req, res)

      return res.status(201).json({
        guide: guide
      })
    } else {
      return res.status(404).json({
        message: 'Guide not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update guide'
    })
  }
}

const postGuide = async (req, res) => {
  try {
    const guide = await repo.postGuide(req.body)

    return res.status(201).json({
      guide: guide
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to create guide'
    })
  }
}

const deleteGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteGuide(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted guide'
      })
    } else {
      return res.status(404).json({
        message: 'Guide not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete guide'
    })
  }
}

const getGuidesBySearch = async (req, res) => {
  try {
    const title = req.query.title

    if (!title || title === '') {
      const guides = await repo.getAllGuides({
        order: [['createdAt', 'DESC']]
      })

      return res.status(200).json({
        guides: guides
      })
    }

    const guides = await repo.getGuidesByTitle(title)

    return res.status(200).json({
      guides: guides
    })
  } catch {
    return res.status(500).json({
      message: 'Failed searching for guides'
    })
  }
}

module.exports = {
  getAllGuides,
  getSingleGuide,
  patchGuide,
  postGuide,
  deleteGuide,
  getGuidesBySearch
}
