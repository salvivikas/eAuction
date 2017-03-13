'use strict';

// Karma configuration
// Generated on Sun Mar 05 2017 19:15:16 GMT+0530 (IST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browserd
    files: [
      'public/components/angular/angular.js',                             // angular
      'public/components/angular-ui-router/release/angular-ui-router.js', // ui-router
      'node_modules/angular-mocks/angular-mocks.js',                      // loads our modules for tests
      'public/components/angular-messages/angular-messages.js',
      'public/components/angular-ui-router/release/angular-ui-router.js',
      'public/components/angular-smart-table/dist/smart-table.js',
      'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/components/angular-bootstrap/ui-bootstrap.js',
      'public/components/angular-file-saver/dist/angular-file-saver.js',
      'public/javascripts/ngApp.js',
      'public/javascripts/services/*js',
      'tests/services/*js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
