
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('urlService', function($location) {

    var service = {};

    service.server = function(suffix){
//      var SERVER_PORT = '80';
      return $location.protocol() + '://' + $location.host() + '/' + suffix;
    };

    return service;

  });

}());
