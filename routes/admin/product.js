'use strict'

var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var models = require(path.join(appRoot.toString(), 'models'));

// Serve product page
router.get('/product', function (req, res) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'admin', 'product.html'));
});

// Get all products
router.get('/productList', function (req, res) {
  getAllProducts().then(function (productList) {
    res.json(productList);
  });
});

// Insert
router.post('/product', function (req, res) {
  models.Product
    .build({
      CategoryId: req.body.CategoryId,
      ProductCode: req.body.ProductCode,
      ProductName: req.body.ProductName,
      IsActive: true
    })
    .save()
    .then(function () { // On success return all active values
      getAllProducts().then(function (productList) {
        res.json(productList);
      });
    },
    function (err) {
      res.status(422).send(err);
    });
});

// Update
router.put('/product/:id', function (req, res) {
  models.Product.find({
    where: {
      Id: req.params.id
    }
  }).then(function (product) {
    if (product) {
      product.updateAttributes({
        CategoryId: req.body.CategoryId,
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName
      }).then(function (product) { // On success return all active values
        getAllProducts().then(function (productList) {
          res.json(productList);
        });
      },
        function (err) {
          res.status(422).send(err);
        });
    }
    else {
      res.send('no data');
    }
  });
});

// Delete
router.delete('/product/:id', function (req, res) {
  models.Product.find({
    where: {
      Id: req.params.id
    }
  }).then(function (product) {
    if (product) {
      product.updateAttributes({
        IsActive: false
      }).then(function (product) { // On success return all active values
        getAllProducts().then(function (productList) {
          res.json(productList);
        });
      },
        function (err) {
          res.status(422).send(err);
        });
    }
    else {
      res.send('no data');
    }
  });
});

var getAllProducts = function () {
  return models.Product.findAll({
    where: {
      IsActive: true
    },
    order: '"ProductCode" ASC'
  });
}

module.exports = router;