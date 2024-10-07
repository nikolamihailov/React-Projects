package com.flow.domain.appointment.mapper;

import com.flow.domain.appointment.dto.AppointmentRequestDTO;
import com.flow.domain.appointment.dto.AppointmentResponseDTO;
import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.service.mapper.ServiceMapper;
import com.flow.domain.user.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ServiceMapper.class})
public interface AppointmentMapper {

  void update(@MappingTarget Appointment toUpdate, AppointmentRequestDTO dto);

  Appointment requestToEntity(AppointmentRequestDTO dto);


  @Mapping(source = "staff", target = "staffMember")
  AppointmentResponseDTO entityToResponse(Appointment appointment);
}
