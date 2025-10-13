const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {}

  Device.init(
    {
      hostname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assetTag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rack: {
        type: DataTypes.STRING,
        allowNull: false
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Device'
    }
  )

  Device.associate = function (models) {
    Device.belongsTo(models.Triage, {
      foreignKey: 'triageId',
      as: 'triage'
    })

    // Device.hasMany(models.Path, {
    //   foreignKey: 'deviceId',
    //   as: 'paths'
    // })
  }

  return Device
}
