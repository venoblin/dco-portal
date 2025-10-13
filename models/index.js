const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const Guide = require('./guides')(sequelize, DataTypes)
const Triage = require('./triages')(sequelize, DataTypes)

module.exports = {
  sequelize,
  Guide,
  Triage
}
