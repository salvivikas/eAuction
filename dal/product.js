'use strict'

var pg = require('pg');
var connectionString = 'postgres://postgres:gotham123@localhost:5432/eAuction';

exports.getAllItems = function (callback) {
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            callback(err, null);
        }

        var queryString = 'select p.id, p.categoryid, p.productcode, p.productname, p.categoryid, c.categoryname from product as p inner join category c on p.categoryid=c.id where p.isactive = true order by productname;'
        client.query(queryString, function (err, result) {
            done();
            callback(null, { success: true, data: result.rows });
        });
    });
};

exports.insert = function (product, callback) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            callback(err, null);
        }

        client.query('SELECT count(*) as count FROM product where productcode = $1 and isactive = true;', [product.productCode], function (err, result) {
            if (result.rows[0].count > 0) {
                done();
                callback(null, { success: false, data: 'Product Code is being used. Please choose a different Product Code.' });
            }
            else {
                client.query('SELECT count(*) as count FROM product where productname = $1 and isactive = true;', [product.productName], function (err, result) {
                    if (result.rows[0].count > 0) {
                        done();
                        callback(null, { success: false, data: 'Product Name is being used. Please choose a different Product Name.' });
                    }
                    else {
                        client.query('INSERT INTO product(categoryid, productcode, productname, isactive) VALUES ($1, $2, $3, true);',
                            [product.categoryId, product.productCode, product.productName]);

                        var queryString = 'select p.id, p.categoryid, p.productcode, p.productname, p.categoryid, c.categoryname from product as p inner join category c on p.categoryid=c.id where p.isactive = true order by productname;'
                        client.query(queryString, function (err, result) {
                            done();
                            callback(null, { success: true, data: result.rows });
                        });
                    }
                });
            }
        });
    });
};

exports.update = function (product, callback) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            callback(err, null);
        }

        client.query('SELECT count(*) as count FROM product where productcode = $1 and id <> $2 and isactive = true;', [product.productCode, product.id], function (err, result) {
            if (result.rows[0].count > 0) {
                done();
                callback(null, { success: false, data: 'Product Code is being used. Please choose a different Product Code.' });
            }
            else {
                client.query('SELECT count(*) as count FROM product where productname = $1 and id <> $2 and isactive = true;', [product.productName, product.id], function (err, result) {
                    if (result.rows[0].count > 0) {
                        done();
                        callback(null, { success: false, data: 'Product Name is being used. Please choose a different Product Name.' });
                    }
                    else {
                        client.query('update product set productcode = $1, productname = $2, categoryid = $3 where id = $4;',
                            [product.productCode, product.productName, product.categoryId, product.id]);

                        var queryString = 'select p.id, p.categoryid, p.productcode, p.productname, p.categoryid, c.categoryname from product as p inner join category c on p.categoryid=c.id where p.isactive = true order by productname;'

                        client.query(queryString, function (err, result) {
                            done();
                            callback(null, { success: true, data: result.rows });
                        });
                    }
                });
            }
        });
    });
};

exports.delete = function (product, callback) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            callback(err, null);
        }

        client.query('update product set isactive = false where id = $1;', [product.id]);

        var queryString = 'select p.id, p.categoryid, p.productcode, p.productname, p.categoryid, c.categoryname from product as p inner join category c on p.categoryid=c.id where p.isactive = true order by productname;'

        client.query(queryString, function (err, result) {
            done();
            callback(null, { success: true, data: result.rows });
        });
    });
};