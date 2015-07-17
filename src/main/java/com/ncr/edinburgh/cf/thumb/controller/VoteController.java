package com.ncr.edinburgh.cf.thumb.controller;

import java.util.Collection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ncr.edinburgh.cf.thumb.model.Vote;
import com.ncr.edinburgh.cf.thumb.service.RoomService;

@Controller
public class VoteController {

	private final RoomService roomService;

	@Autowired
	public VoteController(RoomService roomService) {
		this.roomService = roomService;
	}

	// @MessageMapping("/vote")
	// @SendTo("/topic/votes")
	// public String greeting(Vote vote) throws Exception {
	// Thread.sleep(1000);
	// votes.add(vote);
	// return calculateMood(votes) + " / " + votes.size();
	// }

	@RequestMapping(value = "/room/{roomId}/vote/result", method = RequestMethod.GET)
	public @ResponseBody
	Boolean getVotes(@PathVariable final String roomId) {
		Map<Long, Vote> votes = roomService.getVotes(roomId);
		return calculateMood(votes) > Vote.DEFAULT_THRESHOLD_VOTING;
	}

	@RequestMapping(value = "/room/{roomId}/vote", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Collection<Vote> createRoom(@RequestBody final Vote vote,
			@PathVariable final String roomId,
			final HttpServletRequest request, final HttpServletResponse response) {
		roomService.registerVote(roomId, vote);
		return roomService.getVotes(roomId).values();
	}

	private int calculateMood(final Map<Long, Vote> votes) {
		int score = 0;
		for (Vote v : votes.values()) {
			score += v.getVoteType().getWeight();
		}

		return score;
	}
}
