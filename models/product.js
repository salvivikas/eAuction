'use strict'

module.exports = function (sequelize, DataTypes) {
  var Products = sequelize.define('Product', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductCode: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isUnique: sequelize.validateIsUnique('ProductCode', 'Product Code is being used. Please choose a different Product Code.')
      }
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: sequelize.validateIsUnique('ProductName', 'Product Name is being used. Please choose a different Product Name.')
      }
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
      tableName: 'Product'
    });

  return Products;
}
