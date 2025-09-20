const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const Guide = require('./guides')(sequelize)

module.exports = {
  sequelize,
  Guide
}
