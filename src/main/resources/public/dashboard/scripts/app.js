(function() {
  'use strict';

  angular.module('thumbDashboard', ['ngRoute'])
    .config(function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/createMeeting.html',
          controller: 'CreateMeetingCtrl'
        })
        .when('/startMeeting/:id?/', {
          templateUrl: 'views/startMeeting.html',
          controller: 'StartMeetingCtrl'
        })
        .when('/countdown/:id?/', {
          templateUrl: 'views/countdown.html',
          controller: 'CountdownCtrl'
        })
        .when('/voteResult/:id?/', {
          templateUrl: 'views/voteResult.html',
          controller: 'VoteResultCtrl'
        })
        .when('/alert/:id?/', {
          templateUrl: 'views/alert.html',
          controller: 'AlertCtrl'
        })
        .otherwise({
          templateUrl: 'views/createMeeting.html',
          controller: 'CreateMeetingCtrl'
        });

    });

})();
