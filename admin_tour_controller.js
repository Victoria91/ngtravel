angular.module('Travel').controller('AdminTourController', function($scope, $routeParams) {
	angular.forEach(allTours, function(tour){
		if ($routeParams.slug == tour.slug)
			$scope.tour = tour;
	});
});