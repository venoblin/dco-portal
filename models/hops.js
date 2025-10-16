const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Hop extends Model {}

  Hop.init(
    {
      hop: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Hop'
    }
  )

  Hop.associate = function (models) {
    Hop.belongsTo(models.Path, {
      foreignKey: 'pathId',
      as: 'path'
    })
  }

  return Hop
}
