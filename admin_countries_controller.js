angular.module('Travel').controller('AdminCountriesController', function($scope) {
	$scope.title = 'Список стран';

	$scope.countries = countries;

	$scope.newCountry = { name: null };

	$scope.addCountry = function() {
		$scope.countries.push(angular.copy($scope.newCountry));
		$scope.newCountry = { name: null };
	};

	$scope.showEditForm = function(country) {
		country.edit = true;
	};

	$scope.hideEditForm = function(country) {
		country.edit = false;
	};
});