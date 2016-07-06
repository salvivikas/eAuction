'use strict'

ngApp.controller('productController', ['$scope', '$http', 'modalService', 'utilService',
    function ($scope, $http, modalService, utilService) {
        $scope.mode = 'Add';
        $scope.product = {};
        // $scope.categories = [];
        $scope.serverErrors = [];
$scope.categoryId = 0;

$scope.categories = [
    {categoryID: 1, categoryName: 'C01'},
    {categoryID: 2, categoryName: 'C02'},
    {categoryID: 3, categoryName: 'C03'}
  ];

        $scope.openAdd = function () {
            $scope.mode = 'Add';
            // $scope.product = { CategoryCode: '', CategoryName: '' };
            // $scope.serverErrors = [];
            // $scope.categoryform.$setPristine();
            $("#myModal").modal();
        }

        $scope.openEdit = function (category) {
            // $scope.mode = 'Edit';
            // $scope.serverErrors = [];
            // $scope.category = utilService.deepClone(category); // pass a copy of the object
            // $("#myModal").modal();
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
            // $http.post('/admin/category', $scope.category).then(function (response) {
            //     $scope.categories = response.data;
            //     $('#myModal').modal('toggle'); // Hide Modal
            // },
            //     function (response) {
            //         $scope.serverErrors = [];
            //         if (response.status == 422) {
            //             $scope.serverErrors = utilService.getErrorMessages(response.data.errors);
            //         }
            //     });
        };

        $scope.edit = function (category) {
            // $http.put('/admin/category/' + category.Id, category).then(function (response) {
            //     $scope.categories = response.data;
            //     $('#myModal').modal('toggle'); // Hide Modal
            // },
            //     function (response) {
            //         $scope.serverErrors = [];
            //         if (response.status == 422) {
            //             $scope.serverErrors = utilService.getErrorMessages(response.data.errors);
            //         }
            //     });
        };

        $scope.delete = function (category) {
            // var modalOptions = {
            //     closeButtonText: 'Cancel',
            //     actionButtonText: 'Delete Category',
            //     headerText: 'Delete Category',
            //     bodyText: 'Are you sure you want to delete this category?'
            // };

            // modalService.showModal({}, modalOptions).then(function (result) {
            //     $http.delete('/admin/category/' + category.Id).then(function (response) {
            //         $scope.categories = response.data;
            //     },
            //         function (response) {
            //             alert("failure");
            //         });
            // });
        };

        $scope.refresh = function () {
            // $http.get('/admin/categorylist')
            //     .then(function (response) {
            //         $scope.categories = response.data;
            //     },
            //     function (response) {
            //         $scope.categories = [];
            //     });
        };

        $scope.refresh();
    }]);