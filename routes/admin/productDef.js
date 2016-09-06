'use strict'

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var appRoot = require('app-root-path');
var excel = require('exceljs');

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

router.get('/downloadexcel/:id', function (req, res) {
  var product = JSON.parse(req.params.id);
  productDefDal.getAllItems(product.id, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      var excelPath = path.join(appRoot.toString(), 'files', product.productName + '.xlsx');
      var workbook = new excel.Workbook();
      var sheet = workbook.addWorksheet('Catalog');
      var data = [];
      for (var i = 0; i < result.data.length; i++) {
        data.push(result.data[i].Header);
      }
      sheet.addRow(data);
      workbook.xlsx.writeFile(excelPath)
        .then(function () {
          // res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
          // res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.download(excelPath);
        });
    }
  });
});

module.exports = router;