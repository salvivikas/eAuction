
describe('CategoryService Service', function () {

  var CategoryService;

  var categoryList = {
    "success": true,
    "data": [
      {
        "Id": 1,
        "CategoryCode": "C01",
        "CategoryName": "Automobiles"
      },
      {
        "Id": 2,
        "CategoryCode": "C02",
        "CategoryName": "Electronics"
      }
    ]
  }

  beforeEach(angular.mock.module('ngApp'));

  beforeEach(inject(function (_CategoryService_) {
    CategoryService = _CategoryService_;
  }));

  // Check if Service exists
  it('should be defined', function () {
    expect(CategoryService).toBeDefined();
  });


  describe('getAll', function () {

    it('should be defined', function () {
      expect(CategoryService.getAll).toBeDefined();
    });


    it('should return an object', function () {
      var list = CategoryService.getAll();
      console.log(list);
      expect(list).toBeDefined();
    });

  });

});
