package com.flow.domain.service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public record ServiceRequestDTO(
    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 50, message = "Must be 1-50 characters")
    String name,

    @NotBlank(message = "Description is required")
    @Size(min = 1, max = 200, message = "Must be 1-200 characters")
    String description,

    @NotNull(message = "Duration is required")
    @Min(value = 0, message = "Duration must be above 0")
    @Max(value = 300, message = "Duration must not be over 300")
    short durationMinutes,

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount with up to 2 decimal places")
    BigDecimal price,

    List<Long> userIds
) {

}
