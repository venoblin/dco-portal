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
    triageId: payload.triageId,
    hostname: payload.hostname,
    assetTag: payload.assetTag,
    rack: payload.rack,
    height: payload.height
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
