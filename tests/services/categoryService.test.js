'use strict';

describe('CategoryService Service', function () {

  var CategoryService;
  var $httpBackend;
  var result;

  var categoryList = {
    success: true,
    data: [
      {
        'Id': 1,
        'CategoryCode': 'C01',
        'CategoryName': 'Automobiles'
      },
      {
        'Id': 2,
        'CategoryCode': 'C02',
        'CategoryName': 'Electronics'
      }
    ]
  };

  var errorMessage = 'Error in processing record.';

  beforeEach(angular.mock.module('ngApp'));

  beforeEach(angular.mock.inject(function (_CategoryService_, _$httpBackend_) {
    CategoryService = _CategoryService_;
    //$q = _$q_;
    $httpBackend = _$httpBackend_;

    spyOn(CategoryService, 'getAll').and.callThrough();
    spyOn(CategoryService, 'add').and.callThrough();
    spyOn(CategoryService, 'edit').and.callThrough();
    result = {};
  }));

  // Check if Service exists
  it('should be defined', function () {
    expect(CategoryService).toBeDefined();
  });


  describe('getAll()', function () {

    it('should be defined', function () {
      expect(CategoryService.getAll).toBeDefined();
    });


    it('should return an object with true flag for success and array of categories', function () {
      $httpBackend.whenGET('/admin/categorylist').respond(200, categoryList);

      expect(CategoryService.getAll).not.toHaveBeenCalled();
      expect(result).toEqual({});

      CategoryService.getAll()
        .then(function (res) {
          result = res;
        });

      $httpBackend.flush();

      expect(result.success).toEqual(true);
      expect(Array.isArray(result.data)).toBe(true);

      expect(result.data.length).toBe(2);

      expect(result.data[0].Id).toBe(1);
      expect(result.data[0].CategoryCode).toBe('C01');
      expect(result.data[0].CategoryName).toBe('Automobiles');
    });

    it('should return an error message in case of any server error', function () {
      $httpBackend.whenGET('/admin/categorylist').respond(422, errorMessage);

      expect(CategoryService.getAll).not.toHaveBeenCalled();
      expect(result).toEqual({});
      CategoryService.getAll().then(function (res) {
        result = res;
      }, function (res) {
        result = res;
      });

      $httpBackend.flush();
      expect(result).toEqual(errorMessage);
    });
  });

  describe('add(category)', function () {
    it('should be defined', function () {
      expect(CategoryService.add).toBeDefined();
    });

    it('should add a category and return list of existing categories', function () {
      $httpBackend.whenPOST('/admin/category').respond(200, categoryList);

      expect(CategoryService.add).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = {};

      CategoryService.add(category)
        .then(function (res) {
          result = res;
        });

      $httpBackend.flush();

      expect(result.success).toEqual(true);
      expect(Array.isArray(result.data)).toBe(true);

      expect(result.data.length).toBe(2);

      expect(result.data[0].Id).toBe(1);
      expect(result.data[0].CategoryCode).toBe('C01');
      expect(result.data[0].CategoryName).toBe('Automobiles');
    });

    it('should return success as false and an error message if same category is added', function () {
      $httpBackend.whenPOST('/admin/category').respond(200, { 'success': false, 'data': 'error message' });

      expect(CategoryService.add).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = {};

      CategoryService.add(category)
        .then(function (res) {
          result = res;
        });

      $httpBackend.flush();

      expect(result.success).toEqual(false);

      expect(result.data).toBe('error message');
    });

    it('should send an error message in case of any error on server', function () {
      $httpBackend.whenPOST('/admin/category').respond(422, errorMessage);

      expect(CategoryService.getAll).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = {};

      CategoryService.add(category)
        .then(function (res) {
          result = res;
        }, function (res) {
          result = res;
        });

      $httpBackend.flush();
      expect(result).toEqual(errorMessage);
    });
  });

  describe('edit(category)', function () {
    it('should be defined', function () {
      expect(CategoryService.edit).toBeDefined();
    });

    it('should modify a category and return list of existing categories', function () {
      $httpBackend.whenPUT('/admin/category/1').respond(200, categoryList);

      expect(CategoryService.edit).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = { Id: 1 };

      CategoryService.edit(category)
        .then(function (res) {
          result = res;
        });

      $httpBackend.flush();

      expect(result.success).toEqual(true);
      expect(Array.isArray(result.data)).toBe(true);

      expect(result.data.length).toBe(2);

      expect(result.data[0].Id).toBe(1);
      expect(result.data[0].CategoryCode).toBe('C01');
      expect(result.data[0].CategoryName).toBe('Automobiles');
    });

    it('should return success as false and an error message if modified category data exist in other categories', function () {
      $httpBackend.whenPUT('/admin/category/1').respond(200, { 'success': false, 'data': 'error message' });

      expect(CategoryService.add).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = { Id: 1 };

      CategoryService.edit(category)
        .then(function (res) {
          result = res;
        });

      $httpBackend.flush();

      expect(result.success).toEqual(false);

      expect(result.data).toBe('error message');
    });

    it('should send an error message in case of any error on server', function () {
      $httpBackend.whenPUT('/admin/category/1').respond(422, errorMessage);

      expect(CategoryService.getAll).not.toHaveBeenCalled();
      expect(result).toEqual({});

      var category = { Id: 1 };

      CategoryService.edit(category)
        .then(function (res) {
          result = res;
        }, function (res) {
          result = res;
        });

      $httpBackend.flush();
      expect(result).toEqual(errorMessage);
    });
  });

});
