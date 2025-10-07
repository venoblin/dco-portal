const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Triage extends Model {}

  Triage.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rack: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Triage'
    }
  )

  return Triage
}
