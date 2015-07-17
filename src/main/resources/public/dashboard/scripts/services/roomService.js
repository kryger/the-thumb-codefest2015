
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('roomService', function($http, $q) {

    var roomSession = {};

    var service = {
      get roomSession(){
        return roomSession;
      }
    };

    service.start = function(){
      var deferred = $q.defer();
      $http.get('http://localhost:8080/room/'+roomSession.id+'/start').
        success(function(data) {
          deferred.resolve();
        })
        .error(function(data) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    service.create = function(roomName, timeout, alertPeriod){
      var deferred = $q.defer();
      var roomRequest = {
        name: roomName,
        timeoutSeconds: timeout
      };
      $http.post('http://localhost:8080/room', roomRequest).
        success(function(data) {
          roomSession = data;
          roomSession.alertPeriod = alertPeriod;
          deferred.resolve();
        })
        .error(function(data) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    return service;

  });

}());
