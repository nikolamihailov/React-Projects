package com.flow.web;

import com.flow.domain.appointment.dto.AppointmentRequestDTO;
import com.flow.domain.appointment.dto.AppointmentResponseDTO;
import com.flow.domain.appointment.dto.TimeSlotDTO;
import com.flow.domain.appointment.service.AppointmentService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/appointment")
public class AppointmentController {

  private final AppointmentService appointmentService;

  public AppointmentController(AppointmentService appointmentService) {
    this.appointmentService = appointmentService;
  }

  @PostMapping("/book")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public ResponseEntity<AppointmentResponseDTO> add(@Valid @RequestBody AppointmentRequestDTO dto) {
    final var createdAppointment = appointmentService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
  }

  @GetMapping("/available-time-slots")
  public ResponseEntity<List<TimeSlotDTO>> getAvailableTimeSlots(
      @RequestParam(required = false) Long staffId,
      @RequestParam(required = false) Long serviceId,
      @RequestParam(required = false) LocalDate date
  ) {
    List<TimeSlotDTO> availableSlots = appointmentService.getAvailableTimeSlots(staffId, serviceId, date);

    return ResponseEntity.ok(availableSlots);
  }

  @PatchMapping("/cancel/{id}")
  public ResponseEntity<AppointmentResponseDTO> cancelAppointment(@PathVariable Long id) {
    AppointmentResponseDTO canceledAppointment = appointmentService.cancelAppointment(id);
    return ResponseEntity.ok(canceledAppointment);
  }

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Page<AppointmentResponseDTO>> getAllAppointments(
      @RequestParam(value = "status", required = false) String status, Pageable pageable) {
    return ResponseEntity.ok(appointmentService.getAll(status, pageable));
  }

  @GetMapping("/client/{clientId}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public ResponseEntity<List<AppointmentResponseDTO>> getFutureAppointmentsForClient(
      @PathVariable Long clientId) {
    List<AppointmentResponseDTO> futureAppointments = appointmentService.getFutureAppointmentsForClient(
        clientId);
    return ResponseEntity.ok(futureAppointments);
  }

  @GetMapping("/staff/{staffId}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF_MEMBER')")
  public ResponseEntity<List<AppointmentResponseDTO>> getFutureAppointmentsForStaff(
      @PathVariable Long staffId) {
    List<AppointmentResponseDTO> futureAppointments = appointmentService.getFutureAppointmentsForStaff(
        staffId);
    return ResponseEntity.ok(futureAppointments);
  }
}
