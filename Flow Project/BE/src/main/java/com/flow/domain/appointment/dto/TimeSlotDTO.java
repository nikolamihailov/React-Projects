package com.flow.domain.appointment.dto;

import java.time.LocalDateTime;

public record TimeSlotDTO(
    LocalDateTime startDate,
    LocalDateTime endDate
) {

}
