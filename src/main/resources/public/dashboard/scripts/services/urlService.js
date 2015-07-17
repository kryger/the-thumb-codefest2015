
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('urlService', function($location) {

    var service = {};

    service.server = function(suffix){
      var SERVER_PORT = '8080';
      return $location.protocol() + '://' + $location.host() + ':' + SERVER_PORT + '/' + suffix;
    };

    return service;

  });

}());