angular.module('Travel').controller('AdminToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
                        {objectId: '@objectId'},
                        {
                          query: {isArray: true, transformResponse: parseResults},
                          update: { method:'PUT' }
                        });

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  var Hotel = $resource('https://api.parse.com/1/classes/Hotel/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});


  $scope.tourCountries = Country.query();
  $scope.tourPlaces = Place.query();
  $scope.tourHotels = Hotel.query();
  $scope.tours = Tour.query();

  $scope.newTour = { title: null, countryId: null, text: null, price: null, length: 7 };

  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.countryId = angular.extend($scope.newTour.countryId, { __type: "Pointer", className: "Country"});
    tourToServer.placeId = angular.extend($scope.newTour.placeId, { __type: "Pointer", className: "Place"});
    tourToServer.placeId = angular.extend($scope.newTour.placeId, { __type: "Pointer", className: "Place"});
    tourToServer.$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.newTour = {};
        $scope.tours.push(tourFromServer);
        $scope.hideFormForNew();
      }
    );
  };

  $scope.edit = function(tour){
    tour.showEditForm = true;
  };

  $scope.hideEditForm = function(tour){
    tour.showEditForm = false;
  };

  $scope.showFormForNew = function(){
    $scope.show_form = true;
  };

  $scope.hideFormForNew = function(){
    $scope.show_form = false;
  };

  $scope.delete = function(tour){
    var tourForDelete = Tour.get({objectId: tour.objectId});
    tourForDelete.$delete({objectId: tour.objectId}).then(
      function(tour){
        $scope.tours.splice($scope.tours.indexOf(tourForDelete),1);
      }
    );
  };

  $scope.tourCountry = function(tour){
    if (!tour.countryId) {
      return ''
    } else {
      country = $scope.tourCountries.find(function(country){
        return country.objectId == tour.countryId.objectId;
      });
      return country.name;
    }
  };

  $scope.tourPlace = function(tour){
    if (!tour.placeId) {
      return ''
    } else {
      place = $scope.tourPlaces.find(function(place){
        return place.objectId == tour.placeId.objectId;
      });
      return place.name;
    }
  };

  $scope.tourHotel = function(tour){
    if (!tour.hotelId) {
      return ''
    } else {
      hotel = $scope.tourHotels.find(function(hotel){
        return hotel.objectId == tour.hotelId.objectId;
      });
      return hotel.name + ',' + hotel.stars + '*';
    }
  };

  $scope.update = function(tour){
    Tour.update(tour);
    $scope.hideEditForm(tour);
  };

  $scope.cancelEdit = function(tour){
    $scope.tours[$scope.tours.indexOf(tour)] = Tour.get({objectId: tour.objectId});
    $scope.hideEditForm(tour);
  };
});
