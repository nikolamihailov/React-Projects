package com.flow.domain.user.service;

import com.flow.domain.user.dto.UserRequestDTO;
import com.flow.domain.user.dto.UserResponseDTO;
import com.flow.domain.user.dto.UserUpdateRequestDTO;
import com.flow.domain.user.dto.UserWithRoleStaffRequestDTO;
import com.flow.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

  UserResponseDTO create(UserRequestDTO dto);

  UserResponseDTO createStaffMember(UserWithRoleStaffRequestDTO dto);

  Page<UserResponseDTO> getAll(String role, Pageable pageable);

  UserResponseDTO getById(Long id);

  UserResponseDTO getLoggedUser();

  User getUser(Long id);

  UserResponseDTO updateById(Long id, UserUpdateRequestDTO dto);

  void deleteById(Long id);
}
