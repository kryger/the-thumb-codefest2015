
(function(){

  'use strict';

  angular.module('thumbClient')
    .factory('voteService', function($http, $q, $routeParams, urlService) {

      var rooms = [];
      var room;
      var votes;
      var voterId;

      var service = {
        get rooms(){
          return rooms;
        },
        set rooms(roomsParam){
          rooms = roomsParam;
        },
        get room(){
          return room;
        },
        get votes(){
          return votes;
        },
        get voterId(){
          return voterId;
        },
        get roomId(){
          return $routeParams.roomId;
        }
      };

      function serverUrl(suffix){
        return urlService.server(suffix);
      }

      service.loadRooms = function(){
        var deferred = $q.defer();
        $http.get(serverUrl('room')).
          success(function(data) {
            rooms = data;
            deferred.resolve();
          })
          .error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      };

      service.loadRoom = function(){
        var deferred = $q.defer();
        $http.get(serverUrl('room/'+ service.roomId),
          {
            timeout : 3000
          }).
          success(function(data) {
            room = data;
            deferred.resolve();
          })
          .error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      };

      service.register = function(){
        var deferred = $q.defer();
        var fingerprint = new Fingerprint().get();
        $http.get(serverUrl('room/' + service.roomId + '/register/' + fingerprint),
          {
            timeout : 3000
          }).
          success(function(data) {
            voterId = data.userId;
            deferred.resolve();
          })
          .error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      };

      service.unregister = function(){
        var deferred = $q.defer();
        $http.get(serverUrl('room/' + service.roomId + '/unregister/' + voterId)).
          success(function(data) {
            voterId = undefined;
            deferred.resolve();
          })
          .error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      };

      service.vote = function(vote){
        var deferred = $q.defer();
        var voteRequest = {
          voteType: vote,
          voterId: service.voterId
        };
        $http.post(serverUrl('room/' + service.roomId + '/vote'), voteRequest,
          {
            timeout : 3000
          }).
          success(function(data) {
            votes = data;
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
