const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const models = {
  User: require('./users')(sequelize, DataTypes),
  Guide: require('./guides')(sequelize, DataTypes),
  Triage: require('./triages')(sequelize, DataTypes),
  Device: require('./devices')(sequelize, DataTypes),
  Path: require('./paths')(sequelize, DataTypes),
  Hop: require('./hops')(sequelize, DataTypes)
}

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = { sequelize, ...models }
