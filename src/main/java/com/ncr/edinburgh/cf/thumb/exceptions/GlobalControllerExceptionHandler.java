package com.ncr.edinburgh.cf.thumb.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class GlobalControllerExceptionHandler {

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(EntityNotFoundException.class)
	public void handleNotFound() {
	}

	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(VotingNotAllowedException.class)
	public void handleConflict() {
	}

}