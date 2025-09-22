const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: 'User' }
  )

  return User
}
