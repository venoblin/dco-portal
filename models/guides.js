const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Guide extends Model {}

  Guide.init(
    {
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Guide'
    }
  )

  return Guide
}
