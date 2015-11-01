angular.module('Travel').controller('ToursController', function($scope, $location){
  $scope.title = 'Путешествия';

  $scope.tours = allTours;

  $scope.tourCountries = countries;

  $scope.randomTour = function(){
    $location.path('/admin/tours/sochi');
  };

});