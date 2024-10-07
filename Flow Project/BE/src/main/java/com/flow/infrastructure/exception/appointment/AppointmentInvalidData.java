package com.flow.infrastructure.exception.appointment;

public class AppointmentInvalidData extends RuntimeException {

  public AppointmentInvalidData(String message) {
    super(message);
  }
}
