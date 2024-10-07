package com.flow.domain.appointment.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record AppointmentRequestDTO(
    @NotNull(message = "Service ID is required")
    Long serviceId,

    @NotNull(message = "Staff member ID is required")
    Long staffMemberId,

    @NotNull(message = "Client ID is required")
    Long clientId,

    @NotNull(message = "Start time is required")
    @FutureOrPresent(message = "Start time must be in the future or present")
    LocalDateTime startTime
) {

}
