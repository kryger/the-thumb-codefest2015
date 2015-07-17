package com.ncr.edinburgh.cf.thumb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

	@RequestMapping("/")
	public String index() {
		return "Hello NCR Edinburgh! This is The Thumb Server";
	}

}
