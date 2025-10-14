const repo = require('../repositories/paths')

const getAllPaths = async (req, res) => {
  try {
    const paths = await repo.getAllPaths()

    return res.status(200).json({ paths: paths })
  } catch {
    return res.status(500).json({ message: 'Failed to get all paths' })
  }
}

const getSinglePath = async (req, res) => {
  try {
    const { id } = req.params
    const path = await repo.getSinglePath(id)

    return res.status(200).json({
      path: path
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get path'
    })
  }
}

const patchPath = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchPath(id, req.body)

    if (count === 1) {
      const path = await repo.getSinglePath(id)

      return res.status(201).json({
        path: path
      })
    } else {
      return res.status(404).json({
        message: 'Path not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update path'
    })
  }
}

const postPath = async (req, res) => {
  try {
    const path = await repo.postPath(req.body)

    return res.status(201).json({
      path: path
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Failed to create path'
    })
  }
}

const deletePath = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deletePath(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted path'
      })
    } else {
      return res.status(404).json({
        message: 'Path not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete path'
    })
  }
}

module.exports = {
  getAllPaths,
  postPath,
  getSinglePath,
  patchPath,
  deletePath
}
