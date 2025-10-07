const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const Guide = require('./guides')(sequelize)
const Triage = require('./triages')(sequelize)

module.exports = {
  sequelize,
  Guide,
  Triage
}
