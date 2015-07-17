package com.ncr.edinburgh.cf.thumb.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ncr.edinburgh.cf.thumb.model.Room;
import com.ncr.edinburgh.cf.thumb.model.Vote;
import com.ncr.edinburgh.cf.thumb.repository.ThumbRepository;
import com.ncr.edinburgh.cf.thumb.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

	private final ThumbRepository thumbRepository;
	private final SimpMessagingTemplate stompTemplate;

	@Autowired
	public RoomServiceImpl(ThumbRepository thumb,
			SimpMessagingTemplate stompTemplate) {
		this.thumbRepository = thumb;
		this.stompTemplate = stompTemplate;
	}

	private static final Logger LOGGER = LoggerFactory
			.getLogger(RoomServiceImpl.class);

	@Override
	public Room createRoom(Room room) {
		Room saveRoom = thumbRepository.saveRoom(room);

		stompTemplate.convertAndSend("/topic/rooms",
				thumbRepository.getActiveRooms());
		return saveRoom;
	}

	@Override
	public Room getRoom(String id) {
		final Room room = thumbRepository.findRoom(id);
		return room;
	}

	@Override
	public Collection<Room> getActiveRooms() {
		return thumbRepository.getActiveRooms();
	}

	@Override
	public String registerRoomUser(String roomId, String userId) {
		thumbRepository.registerRoomUser(roomId, userId);
		messageAttendees(roomId);
		return userId;
	}

	private void messageAttendees(String roomId) {
		List<String> allUsers = thumbRepository.findRoom(roomId).getUsers();
		LOGGER.debug("Sending registered users to /topic/attendees/" + roomId);
		Map<String, List<String>> attendeesMap = new HashMap<>();
		attendeesMap.put("userIds", allUsers);
		stompTemplate
				.convertAndSend("/topic/attendees/" + roomId, attendeesMap);
	}

	@Override
	public boolean unregisterRoomUser(String roomId, String userId) {
		return thumbRepository.unregisterRoomUser(roomId, userId);
	}

	@Override
	public Map<Long, Vote> getVotes(String roomId) {
		return thumbRepository.getRoomVotes(roomId);
	}

	@Override
	public void registerVote(String roomId, Vote vote) {
		thumbRepository.registerVote(roomId, vote);
	}

	@Override
	public void startTalk(String roomId) {
		thumbRepository.startTalk(roomId);
		stompTemplate.convertAndSend("/topic/" + roomId + "/talk", true);
	}

	@Override
	public void resetTalk(String roomId) {
		thumbRepository.startTalk(roomId);
	}
}
