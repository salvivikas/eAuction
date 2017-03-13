'use strict'

var pg = require('pg');
var config = require('../config/config.json')
//var connectionString = 'postgres://postgres:gotham123@localhost:5432/eauction';
var selectQuery = 'SELECT id as "Id", productid as "ProductId", header as "Header", description as "Description", datatype as "DataType", ismandatory as "IsMandatory" FROM public.productdefinition where productid = $1 order by Header asc;'

exports.getAllItems = function (id, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      callback(err, null);
    }
    client.query(selectQuery, [id], function (err, result) {
      done();
      callback(null, { success: true, data: result.rows });
    });
  });
};

exports.insert = function (productDef, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      console.log(err);
      callback(err, null);
    }

    client.query('SELECT count(*) as count FROM productdefinition where productid = $1 and header = $2;', [productDef.productId, productDef.header], function (err, result) {
      if (result.rows[0].count > 0) {
        done();
        callback(null, { success: false, data: 'Header is being used. Please choose a different Header.' });
      }
      else {
        client.query('INSERT INTO public.productdefinition(productid, header, description, datatype, ismandatory) VALUES ($1, $2, $3, $4, $5);',
          [productDef.productId, productDef.header, productDef.description, productDef.dataType, productDef.isMandatory]);

        client.query(selectQuery, [productDef.productId], function (err, result) {
          done();
          callback(null, { success: true, data: result.rows });
        });
      }
    });
  });
};

exports.update = function (productDef, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      console.log(err);
      callback(err, null);
    }

    client.query('SELECT count(*) as count FROM productdefinition where productid = $1 and header = $2 and id <> $3;', [productDef.productId, productDef.header, productDef.id], function (err, result) {
      if (result.rows[0].count > 0) {
        done();
        callback(null, { success: false, data: 'Header is being used. Please choose a different Header.' });
      }
      else {
        client.query('UPDATE productdefinition SET header = $1, description = $2, datatype = $3, ismandatory = $4 WHERE id = $5;',
          [productDef.header, productDef.description, productDef.dataType, productDef.isMandatory, productDef.id]);

        client.query(selectQuery, [productDef.productId], function (err, result) {
          done();
          callback(null, { success: true, data: result.rows });
        });
      }
    });
  });
};

exports.delete = function (productDef, callback) {
  pg.connect(config.connectionString, function (err, client, done) {
    if (err) {
      done();
      console.log(err);
      callback(err, null);
    }
    client.query('delete from productdefinition where id = $1;', [productDef.id]);

    client.query(selectQuery, [productDef.productId], function (err, result) {
      done();
      callback(null, { success: true, data: result.rows });
    });
  });
};
