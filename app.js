'use strict'

var express = require('express');
var path = require('path');
var fs = require('fs');
var appRoot = require('app-root-path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin.category, admin.product, admin.productDef);

// Create download folder
var excelPath = path.join(appRoot.toString(), 'files');
if (!fs.existsSync(excelPath)) {
  fs.mkdirSync(excelPath);
};

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler  prinft stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
  });
}

// production error handler - no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
  });
};


module.exports = app;
