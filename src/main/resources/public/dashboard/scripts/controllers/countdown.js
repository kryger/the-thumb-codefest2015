( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('CountdownCtrl', function ($scope, roomService, $interval, pageService) {

    $scope.timeRemaining = 0;
    var timer = null;
    var fullTime = 0;

    function stop(){
      $interval.cancel(timer);
    }

    function start(){
      timer = $interval( function(){
        $scope.timeRemaining--;

        if( $scope.timeRemaining === 0 ){
          outOfTime();
        }

      }, 1000);
    }

    function outOfTime(){
      stop();
      pageService.alert();
    }

    function onRoomGet(data){

      $scope.timeRemaining = data.remainingSeconds;
      fullTime = data.timeoutSeconds;

      start();

    }

    function onRoomGetError(e){
      console.log('Could not retrieve room details: '+e);
    }

    function init(){
      roomService.get().then( onRoomGet, onRoomGetError );
    }

    $scope.onReset = function(){
      stop();
      $scope.timeRemaining = fullTime;
      roomService.reset();
      start();
    };

    $scope.$on('$viewContentLoaded', init);

  });

}());
