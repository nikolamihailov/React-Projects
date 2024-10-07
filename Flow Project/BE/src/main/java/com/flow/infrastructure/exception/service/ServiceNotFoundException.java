package com.flow.infrastructure.exception.service;

public class ServiceNotFoundException extends IllegalArgumentException {

  public ServiceNotFoundException() {
    super();
  }

  public ServiceNotFoundException(String message) {
    super(message);
  }
}
