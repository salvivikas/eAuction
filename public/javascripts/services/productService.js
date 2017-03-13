ngApp.service('ProductService', ['$http', '$q', function ($http, $q) {
  var ProductService = {};

  ProductService.getAll = function () {
    return $q(function (resolve, reject) {
      $http.get('/admin/productlist').then(function (response) {
        resolve(response.data);
      }, function (response) {
        reject(response.data);
      });
    });
  };

  ProductService.add = function (product) {
    return $q(function (resolve, reject) {
      $http.post('/admin/product', product).then(function (response) {
        resolve(response.data);
      }, function (response) {
        if (response.status == 422) {
          reject(response.data);
        }
      });
    });
  };

  ProductService.edit = function (product) {
    return $q(function (resolve, reject) {
      $http.put('/admin/product/' + product.Id, product).then(function (response) {
        resolve(response.data);
      }, function (response) {
        if (response.status == 422) {
          reject(response.data);
        }
      });
    });
  };

  ProductService.delete = function (product) {
    return $q(function (resolve, reject) {
      $http.delete('/admin/product/' + product.Id).then(function (response) {
        resolve(response.data);
      }, function (response) {
        reject(response.data);
      });
    });
  };

  return ProductService;
}]);
