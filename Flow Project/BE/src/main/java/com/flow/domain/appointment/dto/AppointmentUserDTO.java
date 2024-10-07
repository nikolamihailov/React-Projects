package com.flow.domain.appointment.dto;

import com.flow.domain.user.entity.Role;

public record AppointmentUserDTO(
    String email,
    String firstName,
    String lastName,
    Role role) {

}
