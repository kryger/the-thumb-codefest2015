package com.ncr.edinburgh.cf.thumb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

	@RequestMapping("/")
	public String index() {
		return "<html><head><title>The Thumb</title><script type=\"text/javascript\">window.location.href = 'client/index.html';</script></head><body></body></html>";
	}
}
