const repo = require('../repositories/guides')

const getAllGuides = async (req, res) => {
  try {
    const guides = await repo.getAllGuides()

    res.status(200).json({
      guides: guides
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const postGuide = async (req, res) => {
  try {
    const guide = await repo.postGuide(req.body)

    res.status(201).json({
      guide: guide
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {
  getAllGuides,
  postGuide
}
