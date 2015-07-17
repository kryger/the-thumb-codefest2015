
(function(){

  'use strict';

  angular.module('thumbClient')
    .factory('urlService', function($location) {

      var service = {};
      var SERVER_PORT = '8080';

      function url(){
        return $location.protocol() + '://' + $location.host() + ':' + SERVER_PORT + '/';
      }

      service.server = function (suffix){
        return url()+ suffix;
      }

      service.webSocket = function(){
        return url() + 'thethumb';
      }

      return service;

    });

}());
