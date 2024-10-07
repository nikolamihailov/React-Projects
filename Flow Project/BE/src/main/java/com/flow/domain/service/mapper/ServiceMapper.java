package com.flow.domain.service.mapper;

import com.flow.domain.service.dto.ServiceRequestDTO;
import com.flow.domain.service.dto.ServiceResponseDTO;
import com.flow.domain.service.entity.Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ServiceMapper {

  void update(@MappingTarget Service toUpdate, ServiceRequestDTO dto);

  Service requestToEntity(ServiceRequestDTO dto);

  @Mapping(source = "users", target = "users")
  ServiceResponseDTO entityToResponse(Service service);
}
