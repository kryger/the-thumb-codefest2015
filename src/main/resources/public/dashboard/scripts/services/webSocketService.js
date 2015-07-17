
(function(){

  'use strict';

  angular.module('thumbDashboard')
  .factory('webSocketService', function($timeout, roomService, urlService) {

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
      var meetingId = roomService.id;
      doWebSocket( urlService.server('thethumb'), '/topic/attendees/' + meetingId, onData);
    };

    return service;

  });

}());
