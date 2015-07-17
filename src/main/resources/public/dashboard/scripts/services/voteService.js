
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('voteService', function($http, $q) {

    var service = {};

    service.getResult = function(roomId){

      var deferred = $q.defer();

      $http.get('http://localhost:8080/room/'+roomId+'/vote/result').
        success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    return service;

  });

}());
