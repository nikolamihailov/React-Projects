package com.flow.infrastructure.exception.service;

public class ServiceAlreadyExistsException extends RuntimeException {

  public ServiceAlreadyExistsException(String message) {
    super(message);
  }
}
