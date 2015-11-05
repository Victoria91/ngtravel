angular.module('Travel', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
	.when('/',{
		templateUrl: 'admin_list.html',
		controller: 'AdminToursController',
    publicAccess: true,
    resolve: {
      currentUser: function(){
        return {name: 'Alex'};
      }
    }
	})
  .when('/admin/tours/:id',{
    templateUrl: 'item.html',
    controller: 'AdminTourController',
    publicAccess: false
  })
  .when('/admin/countries', {
    templateUrl: 'countries.html',
    controller: 'AdminCountriesController',
    publicAccess: false
  })
  .when('/tours', {
    templateUrl: 'list.html',
    controller: 'ToursController',
    publicAccess: true
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

  $httpProvider.defaults.headers.common = {
    "X-Parse-Application-Id": "GCRvE8tIzX5u7NExe6gvOaXKAxVeBfp99cnWwoMR",
    "X-Parse-REST-API-Key": "wY1jN4llMFzWLVaTVj8pbCHXKOdl1obSgcJNjX26"
  }

});
