const { Hop } = require('../models')

const getAllHops = async (options) => {
  let hops
  if (options) {
    hops = await Hop.findAll(options)
  } else {
    hops = await Hop.findAll()
  }

  return hops
}

const getSingleHop = async (id) => {
  const hop = await Hop.findByPk(id)

  return hop
}

const patchHop = async (id, payload) => {
  const [count] = await Hop.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postHop = async (payload) => {
  const hop = await Hop.create({
    hop: payload.hop
  })

  return hop
}

const deleteHop = async (id) => {
  const count = await Hop.destroy({
    where: {
      id: id
    }
  })

  return count
}

module.exports = {
  getAllHops,
  postHop,
  getSingleHop,
  patchHop,
  deleteHop
}
