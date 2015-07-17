package com.ncr.edinburgh.cf.thumb.repository;

import java.util.Collection;
import java.util.Map;

import com.ncr.edinburgh.cf.thumb.model.Room;
import com.ncr.edinburgh.cf.thumb.model.Vote;

public interface ThumbRepository {
	Room findRoom(String id);

	Room saveRoom(Room room);

	Collection<Room> getActiveRooms();

	void registerRoomUser(String roomId, String userId);

	boolean unregisterRoomUser(String roomId, String userId);

	Map<Long, Vote> getRoomVotes(String roomId);

	void registerVote(String roomId, Vote vote);

	void startTalk(String roomId);
}
