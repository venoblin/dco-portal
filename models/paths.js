const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Path extends Model {}

  Path.init(
    {
      port: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPortActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      destHostname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destPort: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destIsPortActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Path'
    }
  )

  Path.associate = function (models) {
    Path.belongsTo(models.Device, {
      foreignKey: 'deviceId',
      as: 'device'
    })

    Path.hasMany(models.Hop, {
      foreignKey: 'pathId',
      onDelete: 'CASCADE',
      as: 'hops'
    })
  }

  return Path
}
