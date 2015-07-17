package com.ncr.edinburgh.cf.thumb.service;

import java.util.Collection;
import java.util.Map;

import com.ncr.edinburgh.cf.thumb.model.Room;
import com.ncr.edinburgh.cf.thumb.model.Vote;

public interface RoomService {

	Room createRoom(Room room);

	Room getRoom(String id);

	Collection<Room> getActiveRooms();

	String registerRoomUser(String id, String userId);

	boolean unregisterRoomUser(String roomId, String userId);

	Map<Long, Vote> getVotes(String roomId);

	void registerVote(String roomId, Vote vote);

	void startTalk(String roomId);

}
