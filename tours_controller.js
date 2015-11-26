angular.module('Travel').controller('ToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId',
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  $scope.tourCountries = Country.query();
  $scope.tours = Tour.query();
  $scope.tourPlaces = Place.query();

  $scope.randomTour = function(){
    $location.path('/admin/tours/sochi');
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

  $scope.filterByCountry = function(object){
    if ($scope.currentCountry){
      return object.countryId && object.countryId.objectId == $scope.currentCountry
    } else {
      return true;
    }
  };

  $scope.filterByPlace = function(tour){
    if ($scope.currentPlace){
      return tour.placeId && tour.placeId.objectId == $scope.currentPlace
    } else {
      return true;
    }
  };

});
