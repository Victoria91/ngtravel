angular.module('Travel').controller('TravelController', function($scope){
  $scope.title = 'Путешествия';

  $scope.tours = allTours;

  $scope.newTour = { title: null, country: null, text: null, price: null };

  $scope.addTour = function(){
    $scope.tours.push(angular.copy($scope.newTour));
    $scope.hideFormForNew();
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
    $scope.tours.splice($scope.tours.indexOf(tour),1);
  }
});