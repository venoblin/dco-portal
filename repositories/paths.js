const { Path } = require('../models')

const getAllPaths = async (options) => {
  let paths
  if (options) {
    paths = await Path.findAll(options)
  } else {
    paths = await Path.findAll()
  }

  return paths
}

const getSinglePath = async (id) => {
  const path = await Path.findByPk(id)

  return path
}

const patchPath = async (id, payload) => {
  const [count] = await Path.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postPath = async (payload) => {
  const path = await Path.create({
    deviceId: payload.deviceId,
    port: payload.port,
    isPortActive: payload.isPortActive,
    destHostname: payload.destHostname,
    destPort: payload.destPort,
    destIsPortActive: payload.destIsPortActive
  })

  return path
}

const deletePath = async (id) => {
  const count = await Path.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = {
  getAllPaths,
  postPath,
  getSinglePath,
  patchPath,
  deletePath
}
