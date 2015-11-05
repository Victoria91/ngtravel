angular.module('Travel').controller('AdminToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId', 
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});
  $scope.tours = Tour.query();

  $scope.newTour = { title: null, country: null, text: null, price: null };

  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour){
        console.log(tour);
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.newTour = {};
        $scope.tours.push(tourFromServer);
        $scope.hideFormForNew();
      }
    );
  };

  $scope.edit = function(tour){
    tour.show_edit_form = true;
  };

  $scope.hideEditForm = function(tour){
    tour.show_edit_form = false;
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

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  }
});