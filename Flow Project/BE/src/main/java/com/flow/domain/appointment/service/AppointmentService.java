package com.flow.domain.appointment.service;

import com.flow.domain.appointment.dto.AppointmentRequestDTO;
import com.flow.domain.appointment.dto.AppointmentResponseDTO;
import com.flow.domain.appointment.dto.TimeSlotDTO;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {

  AppointmentResponseDTO create(AppointmentRequestDTO dto);

  List<TimeSlotDTO> getAvailableTimeSlots(Long staffId, Long serviceId, LocalDate date);

  List<AppointmentResponseDTO> getFutureAppointmentsForClient(Long clientId);

  List<AppointmentResponseDTO> getFutureAppointmentsForStaff(Long staffId);

  Page<AppointmentResponseDTO> getAll(String status, Pageable pageable);

  AppointmentResponseDTO cancelAppointment(Long appointmentId);
}
