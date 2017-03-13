'use strict';

angular.module('ngApp').controller('categoryController', ['$scope', 'modalService', 'utilService', 'CategoryService',
  function ($scope, modalService, utilService, CategoryService) {
    $scope.mode = 'Add';
    $scope.category = {};
    $scope.categories = [];
    $scope.serverErrors = [];

    $scope.openAdd = function () {
      $scope.mode = 'Add';
      $scope.category = { CategoryCode: '', CategoryName: '' };
      $scope.serverErrors = [];
      $scope.categoryform.$setPristine();
      $('#myModal').modal();
    };

    $scope.openEdit = function (category) {
      $scope.mode = 'Edit';
      $scope.serverErrors = [];
      $scope.category = utilService.deepClone(category); // pass a copy of the object
      $('#myModal').modal();
    };

    $scope.saveModal = function (isValid) {
      if (isValid) { // Client side validations are OK
        if ($scope.mode == 'Add') {
          $scope.add();
        }
        else {
          $scope.edit($scope.category);
        }
      }
    };

    $scope.cancelModal = function () {
      $scope.mode = 'Add';
      $scope.category = {};
      $scope.categoryform.$setPristine();
      $('#myModal').modal('toggle'); // Hide Modal
    };

    $scope.add = function () {
      CategoryService.add($scope.category).then(function (response) {
        $scope.serverErrors = [];
        if (response.success) {
          $scope.categories = response.data;
          $('#myModal').modal('toggle'); // Hide Modal
        } else {
          $scope.serverErrors.push(response.data); // Show server errors
        }
      }, function (response) {
        $scope.serverErrors.push(response.data);
      });
    };

    $scope.edit = function (category) {

      CategoryService.edit(category).then(function (response) {
        $scope.serverErrors = [];
        if (response.success) {
          $scope.categories = response.data;
          $('#myModal').modal('toggle'); // Hide Modal
        } else {
          $scope.serverErrors.push(response.data); // Show server errors
        }
      }, function (response) {
        $scope.serverErrors.push(response.data);
      });
    };

    $scope.delete = function (category) {
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete Category',
        headerText: 'Delete Category',
        bodyText: 'Are you sure you want to delete this category?'
      };

      modalService.showModal({}, modalOptions).then(function (result) {
        CategoryService.delete(category).then(function (response) {
          if (response.success) {
            $scope.categories = response.data;
          }
        }, function (response) {
          alert('failure');
        });
      });
    };

    $scope.refresh = function () {
      CategoryService.getAll().then(function (response) {
        if (response.success) {
          $scope.categories = response.data;
        }
      }, function (response) {
        $scope.categories = [];
      });
    };

    $scope.refresh();
  }]);
