angular.module('Travel').controller('ToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

	var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId', 
												{objectId: '@objectId'},
												{query: {isArray: true, transformResponse: parseResults}});

	var Country = $resource('https://api.parse.com/1/classes/Country/:objectId', 
												{objectId: '@objectId'},
												{query: {isArray: true, transformResponse: parseResults}});

	$scope.tourCountries = Country.query();
	$scope.tours = Tour.query();

  $scope.randomTour = function(){
    $location.path('/admin/tours/sochi');
  };

	$scope.tourCountry = function(tour){
    if (!tour.country_id) {
      return ''
    } else {
  		country = $scope.tourCountries.find(function(country){
        return country.objectId == tour.country_id.objectId;
      });
      return country.name;
    }
	}

  $scope.filterByCountry = function(tour){
    if ($scope.currentCountry){
      return tour.country_id && tour.country_id.objectId == $scope.currentCountry
    } else {
      return true;
    }
  }

	function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  }
});
