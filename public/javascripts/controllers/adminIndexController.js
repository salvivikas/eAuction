'use strict';

angular.module('ngApp').controller('adminIndexController', ['$scope',
  function ($scope) {

    $scope.testmessage = 'adminIndexController';

    $scope.logoutPopover = {
      templateUrl: 'logoutPopover.html'
    };
  }]);
