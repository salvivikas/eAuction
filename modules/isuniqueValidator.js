'use strict';

var validateIsUnique = function (col, msg) {
  var conditions = { where: {} };
  msg = (!msg) ? col + ' must be unique' : msg;
  //console.log(msg);
  return function (value, next) {
    var self = this;
    this.Model.describe().then(function (schema) {
      conditions.where[col] = value;
      conditions.where['IsActive'] = true; // Consider only Active records
      Object.keys(schema).filter(function (field) {
        return schema[field].primaryKey;
      }).forEach(function (pk) {
        conditions.where[pk] = { $ne: self[pk] };
      });
    }).then(function () {
      return self.Model.count(conditions).then(function (found) {
        return (found !== 0) ? next(msg) : next();
      });
    }).catch(next);
  };
};

module.exports = function (Sequelize) {
  Sequelize = !Sequelize ? require('sequelize') : Sequelize;
  Sequelize.prototype.validateIsUnique = validateIsUnique;
  return Sequelize;
};
