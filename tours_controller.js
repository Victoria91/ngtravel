angular.module('Travel').controller('ToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

	var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId', 
												{objectId: '@objectId', include: 'country'},
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
		Country.get({objectId: tour.country_id}).name;
	}

	function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  }
});
