package com.ncr.edinburgh.cf.thumb.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.Strings;
import com.ncr.edinburgh.cf.thumb.util.RandomString;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Room {

	private RoomState state;
	private String id;
	private int timeoutSeconds;
	private Date endDate;
	private String name;
	private final List<Map<Long, Vote>> archivedVotes;
	private Map<Long, Vote> votes;
	private final List<String> users;

	public Room() {
		this.id = RandomString.generate();
		this.name = this.id;
		this.endDate = getDefaultEndDate();
		this.timeoutSeconds = 300;
		this.votes = new ConcurrentHashMap<>();
		this.archivedVotes = new ArrayList<>();
		this.users = new ArrayList<>();
		this.state = RoomState.STOPPED;
	}

	public Room(final String name) {
		this();
		if (!Strings.isNullOrEmpty(name)) {
			this.name = name;
		}
	}

	private Date getDefaultEndDate() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.HOUR, 1);
		return cal.getTime();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTimeoutSeconds() {
		return timeoutSeconds;
	}

	public void setTimeoutSeconds(int timeoutSeconds) {
		this.timeoutSeconds = timeoutSeconds;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Room [id=" + id + ", timeoutSeconds=" + timeoutSeconds
				+ ", name=" + name + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(this);
	}

	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this, obj);
	}

	public List<String> getUsers() {
		return this.users;
	}

	public List<Map<Long, Vote>> getArchivedVotes() {
		return archivedVotes;
	}

	public Map<Long, Vote> getVotes() {
		return votes;
	}

	public void resetVotes() {
		this.votes = new ConcurrentHashMap<>();
	}

	public boolean isVotingAllowed() {
		return this.state.equals(RoomState.STARTED);
	}

	public void setState(RoomState state) {
		this.state = state;
	}

	public RoomState getState() {
		return state;
	}

}
