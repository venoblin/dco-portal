const repo = require('../repositories/guides')

const funcs = {}

funcs.getAllGuides = async (req, res) => {
  try {
    const limit = req.query.limit
    const options = {
      order: [['createdAt', 'DESC']]
    }

    if (limit) {
      options.limit = limit
    }

    const guides = await repo.findAllGuides(options)

    res.status(200).json({
      guides: guides
    })
  } catch {
    res.status(500).json({
      error: 'Failed to get all guides'
    })
  }
}

funcs.getSingleGuide = async (req, res) => {
  try {
    const { id } = req.params
    const guide = await repo.findSingleGuide(id)

    res.status(200).json({
      guide: guide
    })
  } catch {
    res.status(500).json({
      error: 'Failed to get guide'
    })
  }
}

funcs.patchGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.updateGuide(id, req.body)

    if (count === 1) {
      const guide = await getSingleGuide(req, res)

      res.status(200).json({
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

funcs.postGuide = async (req, res) => {
  try {
    const guide = await repo.createGuide(req.body)

    res.status(201).json({
      guide: guide
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Failed to create guide'
    })
  }
}

funcs.deleteGuide = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.destroyGuide(id)

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

funcs.getBySearch = async (req, res) => {
  try {
    const title = req.query.title

    if (title === '') {
      const guides = await repo.findAllGuides({
        order: [['createdAt', 'DESC']]
      })

      res.status(200).json({
        guides: guides
      })
    }

    const guides = await repo.findGuideByTitle(title)

    res.status(200).json({
      guides: guides
    })
  } catch {
    res.status(500).json({
      error: 'Failed searching for guides'
    })
  }
}

module.exports = funcs
