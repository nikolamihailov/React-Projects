package com.flow.domain.user.dto;

import com.flow.domain.user.annotations.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public record UserWithRoleStaffRequestDTO(
    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    String email,

    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 50, message = "Must be 1-50 characters")
    String firstName,

    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 50, message = "Must be 1-50 characters")
    String lastName,

    @ValidPassword
    String password,

    @Pattern(regexp = "^\\+?\\d+$", message = "Invalid phone number")
    String phone,

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age must be above 0")
    @Max(value = 120, message = "Age must not be over 120")
    short age,

    @NotNull(message = "Service id is required")
    List<Long> serviceIds
) {

}
