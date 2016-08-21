'use strict'

ngApp.controller('categoryController', ['$scope', '$http', 'modalService', 'utilService',
    function ($scope, $http, modalService, utilService) {
        $scope.mode = 'Add';
        $scope.category = {};
        $scope.categories = [];
        $scope.serverErrors = [];

        $scope.openAdd = function () {
            $scope.mode = 'Add';
            $scope.category = { CategoryCode: '', CategoryName: '' };
            $scope.serverErrors = [];
            $scope.categoryform.$setPristine();
            $("#myModal").modal();
        }

        $scope.openEdit = function (category) {
            $scope.mode = 'Edit';
            $scope.serverErrors = [];
            $scope.category = utilService.deepClone(category); // pass a copy of the object
            $("#myModal").modal();
        }

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
            $http.post('/admin/category', $scope.category).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.categories = response.data.data;
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

        $scope.edit = function (category) {
            $http.put('/admin/category/' + category.Id, category).then(function (response) {
                $scope.serverErrors = [];
                if (response.data.success) {
                    $scope.categories = response.data.data;
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
                actionButtonText: 'Delete Category',
                headerText: 'Delete Category',
                bodyText: 'Are you sure you want to delete this category?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                $http.delete('/admin/category/' + category.Id).then(function (response) {
                    if (response.data.success) {
                        $scope.categories = response.data.data;
                    }
                },
                    function (response) {
                        alert("failure");
                    });
            });
        };

        $scope.refresh = function () {
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
    }]);