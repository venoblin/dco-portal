const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const User = require('./users')(sequelize)
const Guide = require('./guides')(sequelize)

User.hasMany(Guide)
Guide.belongsTo(User)

module.exports = {
  sequelize,
  Guide,
  User
}
