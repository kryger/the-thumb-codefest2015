(function() {
  'use strict';

  angular.module('thumbDashboard', ['ngRoute'])
    .config(function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/createMeeting.html',
          controller: 'CreateMeetingCtrl'
        })
        .when('/startMeeting', {
          templateUrl: 'views/startMeeting.html',
          controller: 'StartMeetingCtrl'
        })
        .when('/countdown', {
          templateUrl: 'views/countdown.html',
          controller: 'CountdownCtrl'
        })
        .when('/voteResult', {
          templateUrl: 'views/voteResult.html',
          controller: 'VoteResultCtrl'
        })
        .when('/alert', {
          templateUrl: 'views/alert.html',
          controller: 'AlertCtrl'
        })
        .otherwise({
          templateUrl: 'views/createMeeting.html',
          controller: 'CreateMeetingCtrl'
        });

    });

})();
