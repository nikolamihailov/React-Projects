package com.flow.domain.appointment.repository;

import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.appointment.entity.Status;
import org.springframework.data.jpa.domain.Specification;

public class AppointmentSpecifications {

  public static Specification<Appointment> hasStatus(Status status) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
  }
}
