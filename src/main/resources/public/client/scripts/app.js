(function() {
  'use strict';

  angular.module('thumbClient', ['ngRoute'], function() {
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/:roomId', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          templateUrl: 'views/select.html',
          controller: 'SelectCtrl'
        });

    });

})();
