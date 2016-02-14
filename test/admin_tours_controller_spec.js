describe('AdminToursController', function() {
  beforeEach(module('Travel'));
  var $scope = {};
  var $httpBackend = null;
  var resoures = ['Tour', 'Country', 'Place', 'Hotel'];
  var tourForUpdate = null;
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour';
  var country = { name: 'Country name', objectId: '1231erw' };
  var hotel = { name: 'Hotel name', stars: 5 };
  var place = { name: 'Place name'};

  beforeEach(inject(function($controller, _$httpBackend_){
    $controller('AdminToursController', {$scope: $scope});
    $httpBackend = _$httpBackend_;
    resoures.forEach(function(i){
      $httpBackend.whenGET('https://api.parse.com/1/classes/' + i).respond(200, JSON.stringify({results: []}));
    });
  }));

  describe('initialize controller', function() {
    it('sets title to Путешествия', function() {
      expect($scope.title).toBe('Путешествия');
    });

    it('expects to call parse.com for tours list', function(){
      $httpBackend.expectGET('https://api.parse.com/1/classes/Tour').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });

  describe('CRUD', function() {
    describe('update', function() {
      beforeEach(function(){
        $scope.tours = [{ title: 'Old name', length: 10, objectId: '21re43f' }];
        tourForUpdate = $scope.tours[0];
      });

      it('hides tour form', function(){
        spyOn($scope, 'hideEditForm');
        $scope.update(tourForUpdate);
        expect($scope.hideEditForm).toHaveBeenCalledWith(tourForUpdate);
      });

      it('updates the tour values', function(){
        tourForUpdate.title = 'New name';
        $scope.update(tourForUpdate);
        expect(tourForUpdate.title).toEqual('New name');
      });

      it('makes request to parse.com', function(){
        $scope.update(tourForUpdate);
        $httpBackend.expectPUT('https://api.parse.com/1/classes/Tour/' + tourForUpdate.objectId).respond(200);
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });
    });

    describe('create', function() {
      var newTour = null;

      beforeEach(function(){
        var newTour = { title: 'New tour name', length: 10, placeId: place, countryId: country,
                        hotel: hotel }
        $scope.newTour = newTour;
        var jsonResponse = JSON.stringify({results: [newTour]});
        $httpBackend.whenPOST(tourApiUrl).respond(jsonResponse);
      });

      it('makes request to api for create', function(){
        $httpBackend.expectPOST(tourApiUrl);
        $scope.addTour();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });

      it('adds new tour to scope', function(){
        expect($scope.tours.length).toEqual(0)
        $scope.addTour();
        $httpBackend.flush();
        expect($scope.tours.length).toEqual(1);
        expect($scope.tours[0].title).toEqual('New tour name');
        expect($scope.tours[0].length).toEqual(10);
      });
    });

    describe('delete', function(){
      var tourForDelete = null;
      var tourForDeleteUrl = null;

      beforeEach(function(){
        $scope.tours = [ { title: 'Tour for delete', length: 10, objectId: 'ewrwr3e' }];
        tourForDelete = $scope.tours[0];
        tourForDeleteUrl = tourApiUrl + '/' + tourForDelete.objectId;
        $httpBackend.whenGET(tourForDeleteUrl).respond(JSON.stringify({results: [tourForDelete]}));
        $httpBackend.whenDELETE(tourForDeleteUrl).respond(200);
      });

      it('calls api for tour deletion', function(){
        $httpBackend.expectGET(tourForDeleteUrl);
        $httpBackend.expectDELETE(tourForDeleteUrl);
        $scope.delete(tourForDelete);
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });

      it('delete tour from scope', function(){
        expect($scope.tours.length).toEqual(1);
        $scope.delete(tourForDelete);
        $httpBackend.flush();
        expect($scope.tours.length).toEqual(0);
      });
    });
  });

  describe('$scope.tourCountry', function(){
    beforeEach(function(){
      $scope.tourCountries = [country];
      $scope.tours = [ { title: 'Tour with Country', countryId: country },
                       { title: 'Tour without Country'} ];
    });

    it('returns tour country', function(){
      expect($scope.tourCountry($scope.tours[0])).toEqual(country.name);
    });

    it('returns blank string for tour without country', function(){
      expect($scope.tourCountry($scope.tours[1])).toEqual('');
    });
  });

  describe('$scope.cancelEdit', function(){
    var tour = null;

    beforeEach(function(){
      $scope.tours = [ { title: 'Tour name', length: 10, objectId: 'ewrwr3e' }];
      tour = $scope.tours[0];
      $httpBackend.whenGET(tourApiUrl + '/' + tour.objectId).respond(JSON.stringify({results: [tour]}));
    });

    it('hides tour form', function(){
      spyOn($scope, 'hideEditForm');
      $scope.cancelEdit(tour);
      expect($scope.hideEditForm).toHaveBeenCalledWith(tour);
    });

    it('resets tour values', function(){
      tour.title = 'New title';
      $scope.cancelEdit(tour);
      $httpBackend.flush();
      expect($scope.tours[0].results[0].title).toEqual('Tour name');
    })
  });
});
