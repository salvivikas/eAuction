'use strict'

ngApp.controller('categoryController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.mode = 'Add';
        $scope.category = {};
        $scope.categories = [];

        $http.get('/admin/categorylist')
            .then(function (response) {
                $scope.categories = response.data;
            },
            function (response) {
                $scope.categories = [];
            });

        $scope.openAdd = function () {
            $scope.mode = 'Add';
            $scope.category = {};
            $("#myModal").modal();
        }

        $scope.openEdit = function (category) {
            $scope.mode = 'Edit';
            $scope.category = JSON.parse(JSON.stringify(category)); // pass a copy of the object
            $("#myModal").modal();
        }

        $scope.saveModal = function () {
            if ($scope.mode == 'Add') {
                $scope.add();
            }
            else {
                $scope.edit($scope.category);
            }
        };

        $scope.cancelModal = function () {
            $scope.mode = 'Add';
            $scope.category = {};
            $('#myModal').modal('toggle'); // Hide Modal
        };

        $scope.add = function () {
            $http.post('/admin/category', $scope.category).then(function (response) {
                $scope.categories = response.data;
                $('#myModal').modal('toggle'); // Hide Modal
            },
                function (response) {
                    alert("failure");
                });
        };

        $scope.edit = function (category) {
            $http.put('/admin/category/' + category.Id, category).then(function (response) {
                $scope.categories = response.data;
                $('#myModal').modal('toggle'); // Hide Modal
            },
                function (response) {
                    alert("failure");
                });
        };

        $scope.delete = function (category) {
            $http.delete('/admin/category/' + category.Id).then(function (response) {
                $scope.categories = response.data;
            },
                function (response) {
                    alert("failure");
                });
        };
    }]);