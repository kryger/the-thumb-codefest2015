( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('AlertCtrl', function ($scope, pageService, $interval, roomService) {

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
      pageService.voteResult();
    }

    function init(){
      $scope.timeRemaining = parseInt(roomService.alertPeriod, 10);
      if( $scope.timeRemaining === 0 ){
        outOfTime();
      }
      else{
        start();
      }
    }

    $scope.$on('$viewContentLoaded', init);

  });

}());
