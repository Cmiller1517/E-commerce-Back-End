const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Category model
class Product extends Model {}
// Creates the Category fields
Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isDecimal: true,
        } 
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:10,
        validate: {
            isNumeric: true,
        } 
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
      }
)

module.exports = Product;