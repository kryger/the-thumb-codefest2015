
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('roomService', function($http, $q, urlService, $routeParams) {

    var roomSession = {};

    var service = {
      get id(){
        return $routeParams.id;
      }
    };

    service.alertPeriod = 10;

    service.start = function(){
      var deferred = $q.defer();
      $http.get( urlService.server('room/'+service.id+'/start') ).
        success(function() {
          deferred.resolve();
        })
        .error(function(data) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    service.get = function(){
      var deferred = $q.defer();
      $http.get( urlService.server('room/'+service.id) ).
        success(function(data) {
          deferred.resolve(data);
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
      $http.post( urlService.server('room'), roomRequest).
        success(function(data) {
          roomSession = data;
          service.alertPeriod = alertPeriod;
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
