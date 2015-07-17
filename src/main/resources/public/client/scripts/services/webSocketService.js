
(function(){

  'use strict';

  angular.module('thumbClient')
  .factory('webSocketService', function($timeout, voteService, urlService) {

    var service = {};
    var stompClient = null;

    function doWebSocket(uri, topic, onDataFunc){
      var socket = new window.SockJS(uri);
      stompClient = window.Stomp.over(socket);
      stompClient.connect({}, function() {
        stompClient.subscribe(topic, function(data){
          $timeout( function(){
            onDataFunc(data);
          });
        });
      });
    }

    service.readTalk = function(onData){
      doWebSocket(urlService.webSocket(), '/topic/'+ voteService.roomId + '/talk', onData);
    };

    service.readRooms = function(onData){
      doWebSocket(urlService.webSocket(), '/topic/rooms', onData);
    };

    return service;

  });

}());
