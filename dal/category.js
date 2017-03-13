'use strict';

var pg = require('pg');
var config = require('../config/config.json');

var selectQuery = 'select id as "Id", categorycode as "CategoryCode", categoryname as "CategoryName" from category where isactive = true order by categoryname;';

exports.getAllItems = function (callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      callback(err, null);
    }

    client.query(selectQuery, function (err, result) {
      done();
      callback(null, { success: true, data: result.rows });
    });
  });
};

exports.insert = function (category, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      callback(err, null);
    }

    client.query('SELECT count(*) as count FROM category where categorycode = $1 and isactive = true;', [category.categoryCode], function (err, result) {
      if (result.rows[0].count > 0) {
        done();
        callback(null, { success: false, data: 'Category Code is being used. Please choose a different Category Code.' });
      }
      else {
        client.query('SELECT count(*) as count FROM category where categoryname = $1 and isactive = true;', [category.categoryName], function (err, result) {
          if (result.rows[0].count > 0) {
            done();
            callback(null, { success: false, data: 'Category Name is being used. Please choose a different Category Name.' });
          }
          else {
            client.query('INSERT INTO category(categorycode, categoryname, isactive) VALUES ($1, $2, true);',
              [category.categoryCode, category.categoryName]);

            client.query(selectQuery, function (err, result) {
              done();
              callback(null, { success: true, data: result.rows });
            });
          }
        });
      }
    });
  });
};

exports.update = function (category, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      callback(err, null);
    }

    client.query('SELECT count(*) as count FROM category where categorycode = $1 and id <> $2 and isactive = true;', [category.categoryCode, category.id], function (err, result) {
      if (result.rows[0].count > 0) {
        done();
        callback(null, { success: false, data: 'Category Code is being used. Please choose a different Category Code.' });
      }
      else {
        client.query('SELECT count(*) as count FROM category where categoryname = $1 and id <> $2 and isactive = true;', [category.categoryName, category.id], function (err, result) {
          if (result.rows[0].count > 0) {
            done();
            callback(null, { success: false, data: 'Category Name is being used. Please choose a different Category Name.' });
          }
          else {
            client.query('update category set categorycode = $1, categoryname = $2 where id = $3;',
              [category.categoryCode, category.categoryName, category.id]);

            client.query(selectQuery, function (err, result) {
              done();
              callback(null, { success: true, data: result.rows });
            });
          }
        });
      }
    });
  });
};

exports.delete = function (category, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      callback(err, null);
    }

    client.query('update category set isactive = false where id = $1;', [category.id]);

    client.query(selectQuery, function (err, result) {
      done();
      callback(null, { success: true, data: result.rows });
    });
  });
};
