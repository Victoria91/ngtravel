angular.module('Travel').controller('AdminCountriesController', function($scope, $resource) {
	$scope.title = 'Список стран';

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId', 
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  $scope.countries = Country.query();

	$scope.newCountry = { name: null };

	$scope.addCountry = function() {
		var countryToServer = new Country($scope.newCountry);
		countryToServer.$save().then(function(country){
			var countryFromServer = angular.extend(tour, $scope.newCountry)
			$scope.countries.push(angular.copy($scope.newCountry));
			$scope.newCountry = { name: null };
		});
	};

	$scope.showEditForm = function(country) {
		country.edit = true;
	};

	$scope.hideEditForm = function(country) {
		country.edit = false;
	};
});