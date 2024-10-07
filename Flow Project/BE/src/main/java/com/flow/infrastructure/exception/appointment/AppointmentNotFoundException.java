package com.flow.infrastructure.exception.appointment;

public class AppointmentNotFoundException extends RuntimeException {

  public AppointmentNotFoundException(String message) {
    super(message);
  }
}
