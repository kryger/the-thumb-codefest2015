( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('StartMeetingCtrl', function ($scope, roomService, pageService, webSocketService) {

    $scope.startError = '';

    $scope.attendees = [];

    $scope.roomSession = undefined;

    $scope.onStartMeeting = function(){
      console.log('Starting meeting');
      roomService.start();
      pageService.countdown();
    };

    $scope.showStartError = function(){
      return $scope.startError !== '';
    };

    function parseAttendees(rawJsonString){
      try{
        var json = JSON.parse(rawJsonString);
        $scope.attendees = json.userIds;
      }
      catch(e){
        $scope.startError = 'Could not parse attendees: '+e;
      }
    }

    function onRoomGet(data){

      $scope.roomSession = data;

      $scope.attendees = data.users;

      webSocketService.readAttendees( function(data){
        console.log('Updating attendees', data);
        parseAttendees(data.body);
      });

    }

    function onRoomGetError(e){
      $scope.startError = 'Could not retrieve room details: '+e;
    }


    function init(){
      roomService.get().then( onRoomGet, onRoomGetError );
    }

    $scope.$on('$viewContentLoaded', init);

  });

}());
