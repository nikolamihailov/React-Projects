package com.flow.domain.user.dto;

import com.flow.domain.service.dto.ServiceResponseDTO;
import com.flow.domain.user.entity.Role;
import java.util.Set;

public record UserResponseDTO(
    Long id,
    String email,
    String firstName,
    String lastName,
    String phone,
    short age,
    Set<Long> serviceIds,
    Role role
) {

}
