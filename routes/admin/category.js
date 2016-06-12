'use strict'

// TODO : use INDICATIVE for validations
var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var models = require(path.join(appRoot.toString(), 'models'));

// Serve category page
router.get('/category', function (req, res) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'admin', 'category.html'));
});

// Get all active categories
router.get('/categoryList', function (req, res) {
  getAllCategories().then(function (categoryList) {
    res.json(categoryList);
  });
});

// Insert
router.post('/category', function (req, res) {
  models.Category
    .build({
      CategoryCode: req.body.CategoryCode,
      CategoryName: req.body.CategoryName,
      IsActive: true
    })
    .save()
    .then(function () { // On success return all active values
      getAllCategories().then(function (categoryList) {
        res.json(categoryList);
      });
    },
    function (err) {
      res.status(500).send(err);
    });
});

// Update
router.put('/category/:id', function (req, res) {
  models.Category.find({
    where: {
      Id: req.params.id
    }
  }).then(function (category) {
    if (category) {
      category.updateAttributes({
        CategoryCode: req.body.CategoryCode,
        CategoryName: req.body.CategoryName
      }).then(function (category) { // On success return all active values
        getAllCategories().then(function (categoryList) {
          res.json(categoryList);
        });
      },
        function (err) {
          res.status(500).send(err);
        });
    }
    else {
      res.send('no data');
    }
  });
});

// Delete
router.delete('/category/:id', function (req, res) {
  models.Category.find({
    where: {
      Id: req.params.id
    }
  }).then(function (category) {
    if (category) {
      category.updateAttributes({
        IsActive: false
      }).then(function (category) { // On success return all active values
        getAllCategories().then(function (categoryList) {
          res.json(categoryList);
        });
      },
        function (err) {
          res.status(500).send(err);
        });
    }
    else {
      res.send('no data');
    }
  });
});

var getAllCategories = function () {
  return models.Category.findAll({
    where: {
      IsActive: true
    },
    order: '"CategoryCode" ASC'
  });
}

module.exports = router;