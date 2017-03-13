'use strict'

ngApp.controller('productController', ['$scope', '$state', 'modalService', 'utilService', 'ProductService', 'CategoryService',
  function ($scope, $state, modalService, utilService, ProductService, CategoryService) {
    $scope.mode = 'Add';
    $scope.product = {};
    $scope.products = [];
    $scope.categories = [];
    $scope.serverErrors = [];

    $scope.openAdd = function () {
      $scope.mode = 'Add';
      $scope.product = {
        Id: 0,
        CategoryId: 0,
        CategoryName: '',
        ProductCode: '',
        ProductName: ''
      };
      $scope.serverErrors = [];
      $scope.productform.$setPristine();
      $("#myModal").modal();
    }

    $scope.openEdit = function (product) {
      $scope.mode = 'Edit';
      $scope.serverErrors = [];
      $scope.product = utilService.deepClone(product); // pass a copy of the object
      $("#myModal").modal();
    }

    $scope.saveModal = function (isValid) {
      if (isValid) { // Client side validations are OK
        if ($scope.mode == 'Add') {
          $scope.add();
        }
        else {
          $scope.edit($scope.product);
        }
      }
    };

    $scope.cancelModal = function () {
      $scope.mode = 'Add';
      $scope.category = {};
      $scope.productform.$setPristine();
      $('#myModal').modal('toggle'); // Hide Modal
    };

    $scope.add = function () {
      ProductService.add($scope.product).then(function (response) {
        $scope.serverErrors = [];
        if (response.success) {
          $scope.products = response.data;
          $('#myModal').modal('toggle'); // Hide Modal
        } else {
          $scope.serverErrors.push(response.data); // Show server errors
        }
      },
        function (response) {
          $scope.serverErrors.push(response.data);
        });
    };

    $scope.edit = function (product) {
      ProductService.edit(product).then(function (response) {
        $scope.serverErrors = [];
        if (response.success) {
          $scope.products = response.data;
          $('#myModal').modal('toggle'); // Hide Modal
        } else {
          $scope.serverErrors.push(response.data); // Show server errors
        }
      },
        function (response) {
          $scope.serverErrors = push(response.data);
        });
    };

    $scope.delete = function (product) {
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete Product',
        headerText: 'Delete Product',
        bodyText: 'Are you sure you want to delete this product?'
      };

      modalService.showModal({}, modalOptions).then(function (result) {
        ProductService.delete(product).then(function (response) {
          $scope.products = response.data;
        },
          function (response) {
            alert("failure");
          });
      });
    };

    $scope.refresh = function () {
      ProductService.getAll().then(function (response) {
        if (response.success) {
          $scope.products = response.data;
        }
      }, function (response) {
        $scope.products = [];
      });
    };

    $scope.getCategories = function () {
      CategoryService.getAll().then(function (response) {
        if (response.success) {
          $scope.categories = response.data;
        }
      }, function (response) {
        $scope.categories = [];
      });
    };

    $scope.openProductDef = function (product) {
      $state.go('productdef', { 'product': utilService.deepClone(product) }); // pass a copy of the object
    };

    $scope.refresh();
    $scope.getCategories();
  }]);
