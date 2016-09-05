'use strict'

var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var productDefDal = require(path.join(appRoot.toString(), 'dal', 'productDef'));

// Serve product page
router.get('/productdef', function (req, res) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'admin', 'productDef.html'));
});

// Get all definitions for a product
router.get('/productdeflist/:id', function (req, res) {
  productDefDal.getAllItems(req.params.id, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Insert
router.post('/productdef', function (req, res) {
  var productDef = {
    productId: req.body.ProductId,
    header: req.body.Header,
    description: req.body.Description,
    dataType: req.body.DataType,
    isMandatory: req.body.IsMandatory
  };

  productDefDal.insert(productDef, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Update
router.put('/productdef/:id', function (req, res) {
  var productDef = {
    id: req.params.id,
    productId: req.body.ProductId,
    header: req.body.Header,
    description: req.body.Description,
    dataType: req.body.DataType,
    isMandatory: req.body.IsMandatory
  };
  productDefDal.update(productDef, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Delete
router.delete('/productdef/:id', function (req, res) {
  var productDef = JSON.parse(req.params.id);
  productDefDal.delete(productDef, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

module.exports = router;