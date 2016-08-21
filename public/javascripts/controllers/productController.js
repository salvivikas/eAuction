'use strict'

ngApp.controller('productController', ['$scope', '$http', 'modalService', 'utilService',
    function ($scope, $http, modalService, utilService) {
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
            $http.post('/admin/product', $scope.product).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.products = response.data.data;
                    $('#myModal').modal('toggle'); // Hide Modal
                } else {
                    $scope.serverErrors.push(response.data.data); // Show server errors
                }
            },
                function (response) {
                    $scope.serverErrors = [];
                    if (response.status == 422) {
                        $scope.serverErrors = push(response.data.data); //utilService.getErrorMessages(response.data.errors);
                    }
                });
        };

        $scope.edit = function (product) {
            $http.put('/admin/product/' + product.Id, product).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.products = response.data.data;
                    $('#myModal').modal('toggle'); // Hide Modal
                } else {
                    $scope.serverErrors.push(response.data.data); // Show server errors
                }
            },
                function (response) {
                    $scope.serverErrors = [];
                    if (response.status == 422) {
                        $scope.serverErrors = push(response.data.data); //utilService.getErrorMessages(response.data.errors);
                    }
                });
        };

        $scope.delete = function (category) {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Product',
                headerText: 'Delete Product',
                bodyText: 'Are you sure you want to delete this product?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                $http.delete('/admin/product/' + category.Id).then(function (response) {
                    $scope.products = response.data.data;
                },
                    function (response) {
                        alert("failure");
                    });
            });
        };

        $scope.refresh = function () {
            $http.get('/admin/productlist')
                .then(function (response) {
                    if (response.data.success) {
                        $scope.products = response.data.data;
                    }
                },
                function (response) {
                    $scope.products = [];
                });
        };

        $scope.getCategories = function () {
            $http.get('/admin/categorylist')
                .then(function (response) {
                    if (response.data.success) {
                        $scope.categories = response.data.data;
                    }
                },
                function (response) {
                    $scope.categories = [];
                });
        };

        $scope.refresh();
        $scope.getCategories();
    }]);