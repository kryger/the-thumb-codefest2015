( function(){
  'use strict';

  angular.module('thumbClient')
  .controller('SelectCtrl', function ($scope, voteService, webSocketService) {

    $scope.service = voteService;

    function bootstrap() {
      voteService.loadRooms();
    }

    $scope.$on('$viewContentLoaded', bootstrap);

    webSocketService.readRooms( function(data){
      $scope.service.rooms = JSON.parse(data.body); 
    });
  });

}());
