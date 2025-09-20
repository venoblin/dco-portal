const repo = require('../repositories/guides')

const getAllGuides = async (req, res) => {
  const guides = await repo.getAllGuides()

  res.status(200).json({
    guides: guides
  })
}

module.exports = {
  getAllGuides
}
