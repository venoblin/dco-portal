const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

const models = {
  Guide: require('./guides')(sequelize, DataTypes),
  Triage: require('./triages')(sequelize, DataTypes),
  Device: require('./devices')(sequelize, DataTypes)
}

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = { sequelize, ...models }
