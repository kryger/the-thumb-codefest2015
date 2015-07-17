package com.ncr.edinburgh.cf.thumb.repository.impl;

import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ncr.edinburgh.cf.thumb.exceptions.EntityNotFoundException;
import com.ncr.edinburgh.cf.thumb.exceptions.VotingNotAllowedException;
import com.ncr.edinburgh.cf.thumb.model.Room;
import com.ncr.edinburgh.cf.thumb.model.RoomState;
import com.ncr.edinburgh.cf.thumb.model.Vote;
import com.ncr.edinburgh.cf.thumb.repository.ThumbRepository;
import com.ncr.edinburgh.cf.thumb.util.RandomString;

@Repository
public class MemoryThumbRepositoryImpl implements ThumbRepository {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(MemoryThumbRepositoryImpl.class);

	private static final Map<String, Room> rooms = new ConcurrentHashMap<>();
	private static final Map<String, Room> roomsHistory = new ConcurrentHashMap<>();

	@Override
	public Room findRoom(String id) {
		checkRoomExistence(id);
		LOGGER.info("Room retrieved with id " + id);
		return rooms.get(id);
	}

	@Override
	public Room saveRoom(Room room) {
		handleRoomIdCollision(room);
		archiveFinishedRooms();
		LOGGER.info("New created room with id " + room.getId());
		return rooms.put(room.getId(), room);
	}

	private void handleRoomIdCollision(Room room) {
		while (rooms.containsKey(room.getId())) {
			room.setId(RandomString.generate());
		}
	}

	private void archiveFinishedRooms() {
		// FIXME make it concurrent
		for (Room room : rooms.values()) {
			if (new Date().after(room.getEndDate())) {
				roomsHistory.put(room.getId(), room);
				rooms.remove(room.getId());
				LOGGER.info("Archived room with id " + room.getId());
			}
		}
	}

	@Override
	public Collection<Room> getActiveRooms() {
		LOGGER.info("Get rooms");
		return rooms.values();
	}

	@Override
	public void registerRoomUser(String roomId, String userId) {
		checkRoomExistence(roomId);
		LOGGER.info("Register User " + userId + " in Room with id " + roomId);
		if (!rooms.get(roomId).getUsers().contains(userId)) {
			rooms.get(roomId).getUsers().add(userId);
		}
	}

	@Override
	public boolean unregisterRoomUser(String roomId, String userId) {
		checkRoomExistence(roomId);
		LOGGER.info("Unregister User " + userId + " in Room with id " + roomId);
		return rooms.get(roomId).getUsers().remove(userId);
	}

	private void checkRoomExistence(String roomId) {
		if (rooms.get(roomId) == null) {
			LOGGER.warn("Room not found with id " + roomId);
			throw new EntityNotFoundException();
		}
	}

	@Override
	public Map<Long, Vote> getRoomVotes(String roomId) {
		checkRoomExistence(roomId);
		return rooms.get(roomId).getVotes();
	}

	@Override
	public void registerVote(String roomId, Vote vote) {
		checkRoomExistence(roomId);
		if (rooms.get(roomId).isVotingAllowed()) {
			rooms.get(roomId).getVotes().put(vote.getVoterId(), vote);
		} else {
			throw new VotingNotAllowedException();
		}
	}

	@Override
	public void startTalk(String roomId) {
		checkRoomExistence(roomId);
		rooms.get(roomId).setState(RoomState.STARTED);
		rooms.get(roomId).setStartTime(new Date());
		if (!rooms.get(roomId).getVotes().isEmpty()) {
			rooms.get(roomId).getArchivedVotes()
					.add(rooms.get(roomId).getVotes());
			rooms.get(roomId).resetVotes();
		}
	}

	@Override
	public void resetTalk(String roomId) {
		checkRoomExistence(roomId);
		rooms.get(roomId).setStartTime(new Date());
	}

}
