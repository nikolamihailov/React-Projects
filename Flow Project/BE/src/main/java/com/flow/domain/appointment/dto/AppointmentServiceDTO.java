package com.flow.domain.appointment.dto;

import java.math.BigDecimal;

public record AppointmentServiceDTO(
    String name,
    short durationMinutes,
    BigDecimal price
) {

}
