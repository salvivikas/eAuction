'use strict'

var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var models = require(path.join(appRoot.toString(), 'models'));

// Get all products
router.get('/product', function (req, res) {
    res.send('getting all products');
//   models.Category.all().then(function (categoryList) {
//     res.json(categoryList);
//   });
});

module.exports = router;