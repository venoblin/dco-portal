const { Model } = require('sequelize')

module.exports = (db, DataTypes) => {
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
      db,
      modelName: 'Guide'
    }
  )

  return Guide
}
