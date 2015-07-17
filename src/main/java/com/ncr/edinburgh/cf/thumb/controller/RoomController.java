package com.ncr.edinburgh.cf.thumb.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ncr.edinburgh.cf.thumb.model.Room;
import com.ncr.edinburgh.cf.thumb.service.RoomService;

@RestController
public class RoomController {
	private final RoomService roomService;

	@Autowired
	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	@RequestMapping(value = "/room", method = RequestMethod.GET)
	public Collection<Room> getActiveRooms() {
		return roomService.getActiveRooms();
	}

	@RequestMapping(value = "/room/{id}", method = RequestMethod.GET)
	public Room getRoom(@PathVariable final String id) {
		return roomService.getRoom(id);
	}

	@RequestMapping(value = "/room/{roomId}/start", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody
	void startMeeting(@PathVariable final String roomId) {
		roomService.startTalk(roomId);
	}

	@RequestMapping(value = "/room/{roomId}/register/{userId}", method = RequestMethod.GET)
	public Map<String, String> registerRoomUserId(
			@PathVariable final String roomId, @PathVariable final String userId) {
		Map<String, String> result = new HashMap<>();
		roomService.registerRoomUser(roomId, userId);
		result.put("userId", userId);
		return result;
	}

	@RequestMapping(value = "/room/{roomId}/unregister/{userId}", method = RequestMethod.GET)
	public void unregisterRoomUserId(@PathVariable final String roomId,
			@PathVariable final String userId) {
		roomService.unregisterRoomUser(roomId, userId);
	}

	@RequestMapping(value = "/room", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Room createRoom(@RequestBody final Room room,
			final HttpServletResponse response) {
		roomService.createRoom(room);
		response.setHeader(HttpHeaders.LOCATION, "/room/" + room.getId());
		return room;
	}

};
