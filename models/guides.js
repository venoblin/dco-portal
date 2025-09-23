const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Guide extends Model {}

  Guide.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: 'Guide' }
  )

  return Guide
}
