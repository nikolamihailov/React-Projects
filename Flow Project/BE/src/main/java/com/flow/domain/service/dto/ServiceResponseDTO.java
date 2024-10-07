package com.flow.domain.service.dto;

import com.flow.domain.user.dto.UserResponseDTO;
import java.math.BigDecimal;
import java.util.List;

public record ServiceResponseDTO(
    Long id,
    String name,
    String description,
    short durationMinutes,
    BigDecimal price,
    List<UserResponseDTO> users
) {

}

