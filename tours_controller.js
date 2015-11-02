angular.module('Travel').controller('ToursController', function($scope, $location, $http){
  $scope.title = 'Путешествия';

  $scope.randomTour = function(){
    $location.path('/admin/tours/sochi');
  };

  $scope.setCountry = function(country){
    $scope.tours = [];
    angular.forEach(allTours, function(tour){
      if (tour.country == country)
        $scope.tours.push(tour);
    });
  }

  $http({
    method: 'GET',
    url: 'https://api.parse.com/1/classes/Tour',
    headers: {
      "X-Parse-Application-Id": "GCRvE8tIzX5u7NExe6gvOaXKAxVeBfp99cnWwoMR",
      "X-Parse-REST-API-Key": "wY1jN4llMFzWLVaTVj8pbCHXKOdl1obSgcJNjX26"
    }
  }).then(function(response){
    console.log(response);
    $scope.tours = response.data.results;
  });
});
