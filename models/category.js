'use strict'

module.exports = function(sequelize, DataTypes) {
    var Tasks = sequelize.define('Category', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CategoryCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
       tableName: 'Category'
    });

    return Tasks;
}