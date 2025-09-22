const repo = require('../repositories/users')

const funcs = {}

funcs.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await repo.findUserById(id)

    res.status(200).json({
      user: user
    })
  } catch {
    res.status(500).json({
      error: 'Failed to get user'
    })
  }
}

funcs.postUser = async (req, res) => {
  try {
    const user = await repo.createUser(req.body)

    res.status(201).json({
      user: user
    })
  } catch {
    res.status(500).json({
      error: 'Failed to post user'
    })
  }
}

funcs.patchUser = async (req, res) => {
  try {
    const { id } = req.params
    const [count] = await repo.updateUser(id, req.body)

    if (count === 1) {
      const user = await this.getUserById(id)

      res.status(200).json({
        user: user
      })
    } else {
      res.status(404).json({
        error: 'User not found'
      })
    }
  } catch {
    res.status(500).json({
      error: 'Failed to update user'
    })
  }
}

funcs.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.destroyUser(id)

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

module.exports = funcs
