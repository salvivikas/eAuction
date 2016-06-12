'use strict'

ngApp.controller('categoryController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.message = 'categoryController';
        $scope.categories = [];
        //$scope.displayedCollection = [].concat($scope.categories);

        $http.get('/admin/categorylist')
            .then(function (response) {
                $scope.categories = response.data;
            },
            function (response) {
                $scope.categories = [];
            });

        $scope.edit = function (category) {
            $http.put('/admin/category/' + category.Id).then(function (response) {
                $scope.categories = response.data;
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