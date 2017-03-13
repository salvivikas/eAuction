'use strict';

module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define('Category', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    CategoryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isUnique: sequelize.validateIsUnique('CategoryCode', 'Category Code is being used. Please choose a different Category Code.')
      }
    },
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: sequelize.validateIsUnique('CategoryName', 'Category Name is being used. Please choose a different Category Name.')
      }
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
    {
      tableName: 'Category'
    });

  return Categories;
};
