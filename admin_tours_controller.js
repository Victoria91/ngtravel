angular.module('Travel').controller('AdminToursController', function($scope, $location, $resource){
  $scope.title = 'Путешествия';

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId', 
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});
  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId', 
                        {objectId: '@objectId'},
                        {query: {isArray: true, transformResponse: parseResults}});

  $scope.tourCountries = Country.query();
  $scope.tours = Tour.query();

  $scope.newTour = { title: null, country_id: null, text: null, price: null };

  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.country_id = { __type: "Pointer", className: "Country", objectId: tourToServer.country_id };
    // console.log(tourToServer);
    tourToServer.$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour,tourToServer);
        // console.log(tourFromServer);
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

  $scope.tourCountry = function(tour){
    console.log('llll');
    console.log(tour.country_id);
    if (!tour.country_id) {
      return ''
    } else {
      country = $scope.tourCountries.find(function(country){
        return country.objectId == tour.country_id.objectId;
      });
      // console.log(country);
      return country.name;
    }
  }

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  }
});
