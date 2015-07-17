( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('CountdownCtrl', function ($scope, roomService, $interval, pageService) {

    $scope.timeRemaining = 0;
    var timer = null;

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

    function init(){
      $scope.timeRemaining = roomService.roomSession.timeoutSeconds;
      start();
    }

    $scope.onReset = function(){
      stop();
      init();
    };

    $scope.$on('$viewContentLoaded', init);

  });

}());
