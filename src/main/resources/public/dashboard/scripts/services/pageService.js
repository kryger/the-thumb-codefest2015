
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('pageService', function($location) {

    var service = {};

    service.createMeeting = function(){
      $location.path('/createMeeting');
    };

    service.startMeeting = function(){
      $location.path('/startMeeting');
    };

    service.countdown = function(){
      $location.path('/countdown');
    };

    service.voteResult = function(){
      $location.path('/voteResult');
    };

    service.alert = function(){
      $location.path('/alert');
    };

    return service;

  });

}());
