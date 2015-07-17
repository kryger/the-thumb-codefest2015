( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('CreateMeetingCtrl', function ($scope, roomService, pageService) {

    $scope.meetingName = 'My Meeting';
    $scope.timeout = 5;
    $scope.alertPeriod = 10;

    $scope.roomCreationError = '';
    var createInProgress = false;

    function onRoomCreationError(error){
      createInProgress = false;
      $scope.roomCreationError = angular.isObject(error) ? error.message : 'Could not connect to server';
    }

    function onRoomCreation(data){
      pageService.startMeeting(data.id);
    }

    $scope.onCreateMeeting = function(){
      console.log('Creating meeting');
      createInProgress = true;
      $scope.roomCreationError = '';

      roomService.create($scope.meetingName, $scope.timeout, $scope.alertPeriod).then( onRoomCreation, onRoomCreationError);
    };

    $scope.showCreationError = function(){
      return $scope.roomCreationError !== '';
    };

    $scope.canCreateMeeting = function(form){
      return form.$valid === true && createInProgress === false;
    };

  });

}());
