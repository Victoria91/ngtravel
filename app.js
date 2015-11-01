angular.module('Travel', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
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
  .when('/admin/tours/:slug',{
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
}).run(function($rootScope, $route, $location){
  $rootScope.$on('$locationChangeStart', function(event, next, current){
    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath] || $route.routes['/admin/tours/:slug'];

    if(!nextRoute.publicAccess) {
      // alert('Access denied!');
      // $location.path('/');
    }

  });
});

var allTours = [
  {
    title: 'Гостевой дом Лазурь 3*',
    country: 'Россия',
    text: 'Краснодарский край, Сочи. 3-я пляжная линиягалечный пляжбесплатный wi-fi в номерепостроен в 2002 году13 номеров',
    price: 24864,
    slug: 'sochi'
  },
  {
    title: 'Sevilla Palace 4*',
    country: 'Мексика',
    text: 'Федеральный округ, Мехико. бесплатный wi-fi в номерепостроен в 1988 году, 413 номеров, 23 этажа, лифт',
    price: 236252,
    slug: 'mexico'
  }
];

var countries = [
  {
    name: 'Россия',
    code: 'rus'
  },
  {
    name: 'Мексика',
    code: 'mex'
  }
]
