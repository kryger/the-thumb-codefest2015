package com.ncr.edinburgh.cf.thumb.model;

public enum VoteType {
	UP(1), DOWN(-1), DONT_CARE(0);

	private final int weight;

	private VoteType(int weight) {
		this.weight = weight;
	}

	public int getWeight() {
		return weight;
	}
}
