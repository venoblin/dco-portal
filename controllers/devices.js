const repo = require('../repositories/devices')

const getAllDevices = async (req, res) => {
  try {
    const devices = await repo.getAllDevices()

    return res.status(200).json({ devices: devices })
  } catch {
    return res.status(500).json({ message: 'Failed to get all devices' })
  }
}

const getSingleDevice = async (req, res) => {
  try {
    const { id } = req.params
    const device = await repo.getSingleDevice(id)

    return res.status(200).json({
      device: device
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to get device'
    })
  }
}

const patchDevice = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.patchDevice(id, req.body)

    if (count === 1) {
      const device = await repo.getSingleDevice(id)

      return res.status(201).json({
        device: device
      })
    } else {
      return res.status(404).json({
        message: 'device not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to update device'
    })
  }
}

const postDevice = async (req, res) => {
  try {
    const device = await repo.postDevice(req.body)

    return res.status(201).json({
      device: device
    })
  } catch {
    return res.status(500).json({
      message: 'Failed to create device'
    })
  }
}

const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params
    const count = await repo.deleteDevice(id)

    if (count === 1) {
      return res.status(200).json({
        message: 'Successfully deleted device'
      })
    } else {
      return res.status(404).json({
        message: 'Device not found'
      })
    }
  } catch {
    return res.status(500).json({
      message: 'Failed to delete device'
    })
  }
}

module.exports = {
  getAllDevices,
  postDevice,
  getSingleDevice,
  patchDevice,
  deleteDevice
}
