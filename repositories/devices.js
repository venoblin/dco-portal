const { Device } = require('../models')

const getAllDevices = async (options) => {
  let devices
  if (options) {
    devices = await Device.findAll(options)
  } else {
    devices = await Device.findAll()
  }

  return devices
}

const getSingleDevice = async (id) => {
  const device = await Device.findByPk(id)

  return device
}

const patchDevice = async (id, payload) => {
  const [count] = await Device.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postDevice = async (payload) => {
  const device = await Device.create({
    name: payload.name,
    rack: payload.rack
  })

  return device
}

const deleteDevice = async (id) => {
  const count = await Device.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = {
  getAllDevices,
  postDevice,
  getSingleDevice,
  patchDevice,
  deleteDevice
}
