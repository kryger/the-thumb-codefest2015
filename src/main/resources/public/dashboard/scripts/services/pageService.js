
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('pageService', function($location, roomService) {

    var service = {};

    service.createMeeting = function(){
      $location.path('/createMeeting');
    };

    service.startMeeting = function(roomId){
      // note the explicit roomId pass here, this is because it's not available yet
      $location.path('/startMeeting/'+roomId+'/');
    };

    service.countdown = function(){
      $location.path('/countdown/'+roomService.id+'/');
    };

    service.voteResult = function(){
      $location.path('/voteResult/'+roomService.id+'/');
    };

    service.alert = function(){
      $location.path('/alert/'+roomService.id+'/');
    };

    return service;

  });

}());
