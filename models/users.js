const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      ssid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
