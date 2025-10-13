const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {}

  Device.init(
    {
      hostname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rack: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rack: {
        type: DataTypes.STRING,
        allowNull: false
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Device'
    }
  )

  return Device
}
