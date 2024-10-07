package com.flow.domain.appointment.dto;

import java.time.LocalDateTime;

public record AppointmentResponseDTO(
    Long id,
    AppointmentServiceDTO service,
    AppointmentUserDTO staffMember,
    AppointmentUserDTO client,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String status
) {

}
