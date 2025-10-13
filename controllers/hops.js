const repo = require('../repositories/hops')

const getAllHops = async (req, res) => {
  try {
    const hops = await repo.getAllHops()

    return res.status(200).json({ hops: hops })
  } catch {
    return res.status(500).json({ message: 'Failed to get all hops' })
  }
}

const getSingleHop = async (req, res) => {
  try {
    const { id } = req.params
    const hop = await repo.getSingleHop(id)

    return res.status(200).json({
      hop: hop
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get hop'
    })
  }
}

const patchHop = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchHop(id, req.body)

    if (count === 1) {
      const hop = await repo.getSingleHop(id)

      return res.status(201).json({
        hop: hop
      })
    } else {
      return res.status(404).json({
        message: 'Hop not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update hop'
    })
  }
}

const postHop = async (req, res) => {
  try {
    const hop = await repo.postHop(req.body)

    return res.status(201).json({
      hop: hop
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to create hop'
    })
  }
}

const deleteHop = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteHop(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted hop'
      })
    } else {
      return res.status(404).json({
        message: 'Hop not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete hop'
    })
  }
}

module.exports = {
  getAllHops,
  postHop,
  getSingleHop,
  patchHop,
  deleteHop
}
