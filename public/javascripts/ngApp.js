'use strict';

angular.module('ngApp', [
  'ngMessages',
  'ui.router',
  'smart-table',
  'ui.bootstrap',
  'ngFileSaver'
]);

angular.module('ngApp').config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

angular.module('ngApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  //$urlRouterProvider.otherwise('/home');

  // use the HTML5 History API & set HTM5 mode true
  //    $locationProvider.html5Mode(true);
  $stateProvider
    // HOME STATES AND NESTED VIEWS
    .state('home', {
      url: '/home',
      templateUrl: '/home'
    })
    .state('category', {
      url: '/category',
      templateUrl: '/admin/category',
      controller: 'categoryController'
    })
    .state('product', {
      url: '/product',
      templateUrl: '/admin/product',
      controller: 'productController'
    })
    .state('productdef', {
      url: '/productdef',
      templateUrl: '/admin/productdef',
      controller: 'productDefController',
      params: {
        product: null
      }
    });
});
/*
ngApp.service('modalService', ['$uibModal',
    function ($uibModal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'partials/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $uibModalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            }

            return $uibModal.open(tempModalDefaults).result;
        };

    }]);
    */
