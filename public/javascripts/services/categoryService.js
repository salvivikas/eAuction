'use strict';

angular.module('ngApp').service('CategoryService', ['$http', '$q', function ($http, $q) {
  var CategoryService = {};

  CategoryService.getAll = function () {
    return $q(function (resolve, reject) {
      $http.get('/admin/categorylist').then(function (response) {
        resolve(response.data);
      }, function (response) {
        reject(response.data);
      });
    });
  };

  CategoryService.add = function (category) {
    return $q(function (resolve, reject) {
      $http.post('/admin/category', category).then(function (response) {
        resolve(response.data);
      }, function (response) {
        if (response.status == 422) {
          reject(response.data);
        }
      });
    });
  };

  CategoryService.edit = function (category) {
    return $q(function (resolve, reject) {
      $http.put('/admin/category/' + category.Id, category).then(function (response) {
        resolve(response.data);
      }, function (response) {
        if (response.status == 422) {
          reject(response.data);
        }
      });
    });
  };

  CategoryService.delete = function (category) {
    return $q(function (resolve, reject) {
      $http.delete('/admin/category/' + category.Id).then(function (response) {
        resolve(response.data);
      }, function (response) {
        reject(response.data);
      });
    });
  };

  return CategoryService;
}]);
