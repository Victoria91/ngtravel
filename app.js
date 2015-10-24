var app = angular.module('Travel',[]);

app.controller('TravelController', function($scope){
  $scope.title = 'Путешествия';

  $scope.tours = [
    {
      title: 'Гостевой дом Лазурь 3*',
      country: 'Россия, Краснодарский край, Сочи',
      text: '3-я пляжная линиягалечный пляжбесплатный wi-fi в номерепостроен в 2002 году13 номеров',
      price: 24864
    },
    {
      title: 'Sevilla Palace 4*',
      country: 'Мексика, Федеральный округ, Мехико',
      text: 'бесплатный wi-fi в номерепостроен в 1988 году, 413 номеров, 23 этажа, лифт',
      price: 236252
    }
  ];

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
