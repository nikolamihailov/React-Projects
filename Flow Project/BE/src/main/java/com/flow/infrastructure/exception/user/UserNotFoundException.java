package com.flow.infrastructure.exception.user;

public class UserNotFoundException extends IllegalArgumentException {

  public UserNotFoundException(String message) {
    super(message);
  }
}
