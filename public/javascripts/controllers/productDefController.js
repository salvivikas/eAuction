'use strict'

ngApp.controller('productDefController', ['$scope', '$http', '$stateParams', 'modalService', 'utilService',
    function ($scope, $http, $stateParams, modalService, utilService) {

        $scope.mode = 'Add';
        $scope.productDef = {};
        $scope.product = $stateParams.product;
        $scope.productDefList = [];
        $scope.dataTypes = ['Text', 'Numeric', 'YesNo'];
        $scope.serverErrors = [];

        $scope.openAdd = function () {
            $scope.mode = 'Add';
            $scope.productDef = {
                Id: 0,
                ProductId: $scope.product.Id,
                Header: '',
                Description: '',
                DataType: 'Text',
                IsMandatory: false
            };
            $scope.serverErrors = [];
            $scope.productdefform.$setPristine();
            $("#myModal").modal();
        }

        $scope.openEdit = function (productDef) {
            $scope.mode = 'Edit';
            $scope.serverErrors = [];
            $scope.productDef = utilService.deepClone(productDef); // pass a copy of the object
            $("#myModal").modal();
        };

        $scope.saveModal = function (isValid) {
            if (isValid) { // Client side validations are OK
                if ($scope.mode == 'Add') {
                    $scope.add();
                }
                else {
                    $scope.edit($scope.productDef);
                }
            }
        }

        $scope.cancelModal = function () {
            $scope.mode = 'Add';
            $scope.productDef = {};
            $scope.productdefform.$setPristine();
            $('#myModal').modal('toggle'); // Hide Modal
        };

        $scope.add = function () {
            $http.post('/admin/productdef', $scope.productDef).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.productDefList = response.data.data;
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

        $scope.edit = function (productDef) {
            $http.put('/admin/productdef/' + productDef.Id, productDef).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.productDefList = response.data.data;
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

        $scope.delete = function (productDef) {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Product Definition',
                headerText: 'Delete Product Definition',
                bodyText: 'Are you sure you want to delete this product definition?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                var data = {
                    id: productDef.Id,
                    productId: productDef.ProductId
                }
                $http.delete('/admin/productdef/' + JSON.stringify(data), JSON.stringify(productDef)).then(function (response) {
                    $scope.productDefList = response.data.data;
                },
                    function (response) {
                        alert("failure");
                    });
            });
        };

        $scope.getProductDefList = function () {
            $http.get('/admin/productdeflist/' + $scope.product.Id)
                .then(function (response) {
                    if (response.data.success) {
                        $scope.productDefList = response.data.data;
                    }
                },
                function (response) {
                    $scope.productDefList = [];
                });
        };

        $scope.getProductDefList();
    }])