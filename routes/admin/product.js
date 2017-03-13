'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var productDal = require(path.join(appRoot.toString(), 'dal', 'product'));

// Serve product page
router.get('/product', function (req, res) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'admin', 'product.html'));
});

// Get all products
router.get('/productList', function (req, res) {
  productDal.getAllItems(function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Insert
router.post('/product', function (req, res) {
  var product = {
    productCode: req.body.ProductCode,
    productName: req.body.ProductName,
    categoryId: req.body.CategoryId
  };
  productDal.insert(product, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Update
router.put('/product/:id', function (req, res) {
  var product = {
    id: req.params.id,
    productCode: req.body.ProductCode,
    productName: req.body.ProductName,
    categoryId: req.body.CategoryId
  };
  productDal.update(product, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Delete
router.delete('/product/:id', function (req, res) {
  var product = {
    id: req.params.id
  };
  productDal.delete(product, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

module.exports = router;
