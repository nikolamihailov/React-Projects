package com.flow.domain.user.mapper;

import com.flow.domain.service.entity.Service;
import com.flow.domain.user.dto.UserRequestDTO;
import com.flow.domain.user.dto.UserResponseDTO;
import com.flow.domain.user.dto.UserUpdateRequestDTO;
import com.flow.domain.user.dto.UserWithRoleStaffRequestDTO;
import com.flow.domain.user.entity.User;
import java.util.HashSet;
import java.util.Set;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

  void update(@MappingTarget User toUpdate, UserUpdateRequestDTO dto);

  User requestToEntity(UserRequestDTO dto);

  User requestToEntityStaff(UserWithRoleStaffRequestDTO dto);

  @Mapping(target = "serviceIds", source = "services")
  @Mapping(target = "role", source = "role")
  UserResponseDTO entityToResponse(User user);

  default Set<Long> map(Set<Service> services) {
    if (services == null) {
      return null;
    }
    Set<Long> ids = new HashSet<>();
    for (Service service : services) {
      ids.add(service.getId());
    }
    return ids;
  }
}
