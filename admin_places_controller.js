angular.module('Travel').controller('AdminPlacesController', function($scope, $resource) {
	$scope.title = 'Список мест';

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId', 
                        {objectId: '@objectId'},
                        {
                        	query: {isArray: true, transformResponse: parseResults},
                        	update: { method: 'PUT' }
                      });

  $scope.places = Place.query();

	$scope.newPlace = { name: null };

	$scope.addPlace = function() {
		var placeToServer = new Place($scope.newPlace);
		placeToServer.$save().then(function(place){
			var placeFromServer = angular.extend(place, $scope.newPlace)
			$scope.places.push(placeFromServer);
			$scope.newPlace = { name: null };
		});
	};

	$scope.update = function(place) {
		Place.update(place);
		$scope.hideEditForm(place);
	};

	$scope.delete = function(place){
		placeForDelete = Place.get(place);
		placeForDelete.$delete(place).then(
      function(place){
        $scope.places.splice($scope.places.indexOf(placeForDelete),1);
        hideEditForm(place);
      }
		);
	};

	$scope.showEditForm = function(place) {
		place.edit = true;
	};

	$scope.hideEditForm = function(place) {
		place.edit = false;
	};
});
