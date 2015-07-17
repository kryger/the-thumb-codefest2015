
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('webSocketService', function($timeout, roomService) {

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

    service.readAttendees = function(onData){
      var meetingId = roomService.roomSession.id;
      doWebSocket('http://localhost:8080/thethumb', '/topic/attendees/' + meetingId, onData);
    };

    return service;

  });

}());
