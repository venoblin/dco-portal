const getAllGuides = async (req, res) => {
  res.status(200).json({
    guides: 'GUIDES'
  })
}

module.exports = {
  getAllGuides
}
