const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Triage extends Model {}

  Triage.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Triage'
    }
  )

  Triage.associate = function (models) {
    Triage.hasMany(models.Device, {
      foreignKey: 'triageId',
      as: 'devices'
    })
  }

  return Triage
}
