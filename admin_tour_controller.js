angular.module('Travel').controller('AdminTourController', function($scope, $routeParams, $resource) {

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId', {objectId: '@objectId'});
  $scope.tour = Tour.get({objectId: $routeParams.id});
});