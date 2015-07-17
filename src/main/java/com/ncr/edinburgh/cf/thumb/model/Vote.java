package com.ncr.edinburgh.cf.thumb.model;

public class Vote {
	public static final int DEFAULT_THRESHOLD_VOTING = 0;

	private VoteType voteType;
	private Long voterId;

	public VoteType getVoteType() {
		return voteType;
	}

	public void setVoteType(VoteType voteType) {
		this.voteType = voteType;
	}

	public Long getVoterId() {
		return voterId;
	}

	public void setVoterId(Long voterId) {
		this.voterId = voterId;
	}

	@Override
	public String toString() {
		return "Vote [voteType=" + voteType + ", voterId=" + voterId + "]";
	}
}
