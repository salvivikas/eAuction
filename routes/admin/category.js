'use strict'

// TODO : use INDICATIVE for validations
var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var categoryDal = require(path.join(appRoot.toString(), 'dal', 'category'));

// Serve category page
router.get('/category', function (req, res) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'admin', 'category.html'));
});

// Get all active categories
router.get('/categoryList', function (req, res) {
  categoryDal.getAllItems(function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Insert
router.post('/category', function (req, res) {
  var category = {
    categoryCode: req.body.CategoryCode,
    categoryName: req.body.CategoryName
  };
  categoryDal.insert(category, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Update
router.put('/category/:id', function (req, res) {
  var category = {
    id: req.params.id,
    categoryCode: req.body.CategoryCode,
    categoryName: req.body.CategoryName
  };
  categoryDal.update(category, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

// Delete
router.delete('/category/:id', function (req, res) {
  var category = {
    id: req.params.id
  };
  categoryDal.delete(category, function (err, result) {
    if (err) {
      return res.status(422).send('Error in processing record.');
    }
    else {
      return res.json(result);
    }
  });
});

module.exports = router;
