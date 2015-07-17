( function(){
  'use strict';

  angular.module('thumbDashboard')
  .controller('VoteResultCtrl', function ($scope, voteService, pageService, roomService) {

    $scope.voteResult = undefined;

    $scope.voteError = '';

    function onResult(data){
      $scope.voteResult = data;
    }

    function onResultError(data){
      if( data === null ){
        data = 'Could not connect to server';
      }
      console.log('Error retrieving result: '+data);
      $scope.voteError = data;
    }

    function init(){
      voteService.getResult(roomService.id).then( onResult, onResultError );
    }

    $scope.restart = function(){
      roomService.start();
      pageService.countdown();
    };

    $scope.votePassed = function(){
      return $scope.voteResult === true;
    };

    $scope.voteFailed = function(){
      return $scope.voteResult === false;
    };

    $scope.$on('$viewContentLoaded', init);

  });

}());
