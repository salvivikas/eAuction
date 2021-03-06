'use strict';

var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var path = require('path');

// GET home page.
router.get('/', function (req, res, next) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'index.html'));
});

router.get('/home', function (req, res, next) {
  res.sendFile(path.join(appRoot.toString(), 'views', 'home.html'));
});
module.exports = router;
