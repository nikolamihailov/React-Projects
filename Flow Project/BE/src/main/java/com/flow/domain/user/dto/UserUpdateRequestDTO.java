package com.flow.domain.user.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public record UserUpdateRequestDTO(
    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    String email,

    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 50, message = "Must be 1-50 characters")
    String firstName,

    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 50, message = "Must be 1-50 characters")
    String lastName,

    @Pattern(regexp = "^\\+?\\d+$", message = "Invalid phone number")
    String phone,

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age must be above 0")
    @Max(value = 120, message = "Age must not be over 120")
    short age,

    List<Long> serviceIds
) {

}
