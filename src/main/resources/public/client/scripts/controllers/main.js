( function(){
  'use strict';

  angular.module('thumbClient')
  .controller('MainCtrl', function ($scope, voteService, webSocketService) {

    $scope.service = voteService;

    $scope.loaded = false;
    $scope.isStarted = false;
    $scope.errorMessage = undefined;

    function bootstrap() {
      webSocketService.readTalk(function(data) {
        $scope.isStarted = data.body;
        $scope.currentVote = undefined;
        $scope.errorMessage = undefined;
      });
      voteService.loadRoom().then(function(){
        $scope.isStarted = (voteService.room.state === 'STARTED');
        voteService.register().then(function(){
          $scope.loaded = true;
        },function (){
          $scope.errorMessage = 'Could not register the user.';
          $scope.loaded = true;
        });
      }, function () {
        $scope.errorMessage = 'Could not connect to server.';
        $scope.loaded = true;
      });
      //TODO Connect to the websocket??
    }

    $scope.sendVote = function (vote) {
      voteService.vote(vote).then(function() {
        $scope.currentVote = vote;
        $scope.errorMessage = undefined;
      }, function () {
        $scope.errorMessage = 'Voting is not allowed.';
      });
    };

    $scope.notSelected = function(vote){
      return ($scope.currentVote && $scope.currentVote !== vote)
        || !!$scope.errorMessage || !$scope.loaded || !$scope.isStarted;
    }

    $scope.$on('$viewContentLoaded', bootstrap);
  });

}());
