const { Op } = require('sequelize')
const { Triage, Device, Path, Hop } = require('../models')

const getAllTriages = async (options) => {
  let triages

  if (options) {
    triages = await Triage.findAll(options)
  } else {
    triages = await Triage.findAll()
  }

  return triages
}

const getSingleTriage = async (id) => {
  const triage = await Triage.findByPk(id, {
    include: [
      {
        model: Device,
        as: 'devices',
        separate: true,
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Path,
            as: 'paths',
            separate: true,
            order: [['createdAt', 'ASC']],
            include: [
              {
                model: Hop,
                as: 'hops',
                separate: true,
                order: [['createdAt', 'ASC']]
              }
            ]
          }
        ]
      }
    ]
  })

  return triage
}

const patchTriage = async (id, payload) => {
  const [count] = await Triage.update(payload, {
    where: {
      id: id
    }
  })

  return count
}

const postTriage = async (payload) => {
  const triage = await Triage.create({
    name: payload.name,
    rack: payload.rack
  })

  return triage
}

const deleteTriage = async (id) => {
  const count = await Triage.destroy({
    where: {
      id: id
    }
  })

  return count
}

const getTriagesByName = async (name) => {
  const triage = await Triage.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  })

  return triage
}

module.exports = {
  getAllTriages,
  postTriage,
  getSingleTriage,
  patchTriage,
  getTriagesByName,
  deleteTriage
}
