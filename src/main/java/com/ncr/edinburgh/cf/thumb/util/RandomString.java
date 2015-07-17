package com.ncr.edinburgh.cf.thumb.util;

import org.apache.commons.lang3.RandomStringUtils;

public final class RandomString {

	public static String generate() {
		return RandomStringUtils.randomAlphabetic(3).toLowerCase();
	}

	public static String generateUser() {
		return RandomStringUtils.randomNumeric(12);
	}
}
