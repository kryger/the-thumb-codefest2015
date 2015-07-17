
(function(){

  'use strict';

  angular.module('thumbClient')
    .factory('urlService', function($location) {

      var service = {};
//      var SERVER_PORT = '80';

      function url(){
        return $location.protocol() + '://' + $location.host() + '/';
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
