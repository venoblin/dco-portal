const repo = require('../repositories/users')

const getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit
    const options = {
      order: [['createdAt', 'DESC']]
    }

    if (limit) {
      options.limit = limit
    }

    const users = await repo.getAllUsers(options)

    return res.status(200).json({
      users: users
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get all Users'
    })
  }
}

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await repo.getSingleUser(id)

    return res.status(200).json({
      user: user
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get User'
    })
  }
}

const patchUser = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchUser(id, req.body)

    if (count === 1) {
      const user = await repo.getSingleUser(id)

      return res.status(201).json({
        user: user
      })
    } else {
      return res.status(404).json({
        message: 'User not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update User'
    })
  }
}

const postUser = async (req, res) => {
  try {
    const user = await repo.postUser(req.body)

    return res.status(201).json({
      user: user
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to create User'
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteUser(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted User'
      })
    } else {
      return res.status(404).json({
        message: 'User not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete User'
    })
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  patchUser,
  postUser,
  deleteUser
}
