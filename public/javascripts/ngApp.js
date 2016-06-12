'use strict'

var ngApp = angular.module('ngApp', ['ui.router', 'smart-table']);

ngApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //$urlRouterProvider.otherwise('/home');

// use the HTML5 History API & set HTM5 mode true
//    $locationProvider.html5Mode(true);
    $stateProvider
        // HOME STATES AND NESTED VIEWS
        .state('home', {
            url: '/home',
            templateUrl: '/home'
        })
        .state('category', {
            url: '/category',
            templateUrl: '/admin/category',
            controller: 'categoryController'
        })
        .state('product', {
            url: '/product',
            templateUrl: '/admin/product'
        });
});