package com.flow.domain.appointment.service;

import com.flow.domain.appointment.dto.AppointmentRequestDTO;
import com.flow.domain.appointment.dto.AppointmentResponseDTO;
import com.flow.domain.appointment.dto.TimeSlotDTO;
import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.appointment.entity.Status;
import com.flow.domain.appointment.mapper.AppointmentMapper;
import com.flow.domain.appointment.repository.AppointmentRepository;
import com.flow.domain.appointment.repository.AppointmentSpecifications;
import com.flow.domain.service.entity.Service;
import com.flow.domain.service.service.ServiceService;
import com.flow.domain.user.entity.Role;
import com.flow.domain.user.entity.User;
import com.flow.domain.user.service.UserService;
import com.flow.infrastructure.exception.appointment.AppointmentInvalidData;
import com.flow.infrastructure.exception.appointment.AppointmentNotFoundException;
import com.flow.infrastructure.mail.EmailService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

  private final AppointmentRepository appointmentRepository;
  private final AppointmentMapper appointmentMapper;
  private final UserService userService;
  private final ServiceService serviceService;
  private final EmailService emailService;
  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy 'at' hh:mm a");

  @Value("${staff.working.hours.start}")
  private LocalTime startWorkingHour;

  @Value("${staff.working.hours.end}")
  private LocalTime endWorkingHour;


  public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
      AppointmentMapper appointmentMapper, UserService userService, ServiceService serviceService,
      EmailService emailService) {
    this.appointmentRepository = appointmentRepository;
    this.appointmentMapper = appointmentMapper;
    this.userService = userService;
    this.serviceService = serviceService;
    this.emailService = emailService;
  }

  @Override
  public AppointmentResponseDTO create(AppointmentRequestDTO dto) {
    User client = userService.getUser(dto.clientId());
    User staff = userService.getUser(dto.staffMemberId());
    Service service = serviceService.getService(dto.serviceId());

    validateAppointment(client, staff, service, dto.startTime(),
        dto.startTime().plusMinutes(service.getDurationMinutes()));

    Appointment appointment = appointmentMapper.requestToEntity(dto);
    appointment.setEndTime(appointment.getStartTime().plusMinutes(service.getDurationMinutes()));
    appointment.setClient(client);
    appointment.setStaff(staff);
    appointment.setService(service);
    appointment.setStatus(Status.SCHEDULED);

    final var createdAppointment = appointmentRepository.save(appointment);

    String formattedDateTime = appointment.getStartTime().format(formatter);
    emailService.sendEmail(client.getEmail(), client.getFirstName(), client.getLastName(),
        "Appointment Confirmation",
        "Your appointment is confirmed for " + formattedDateTime);

    return appointmentMapper.entityToResponse(createdAppointment);
  }

  @Override
  public List<TimeSlotDTO> getAvailableTimeSlots(Long staffId, Long serviceId, LocalDate date) {

    if (staffId == null) {
      throw new IllegalArgumentException("Staff ID is required");
    }

    if (serviceId == null) {
      throw new IllegalArgumentException("Service ID is required");
    }

    if (date == null) {
      throw new IllegalArgumentException("Date is required");
    }

    if (date.isBefore(LocalDate.now())) {
      throw new IllegalArgumentException("Date must be in the present or future");
    }

    userService.getUser(staffId);
    Service service = serviceService.getService(serviceId);

    List<Appointment> appointments = appointmentRepository.findAppointmentsForEmployeeOnDate(
        staffId, date);

    List<TimeSlotDTO> availableSlots = new ArrayList<>();

    LocalDateTime slot = LocalDateTime.of(date, startWorkingHour);

    LocalDateTime currentTime = LocalDateTime.now();

    while (slot.toLocalTime().isBefore(endWorkingHour)) {
      LocalDateTime slotEnd = slot.plusMinutes(service.getDurationMinutes());

      if (slot.isAfter(currentTime) && slotEnd.toLocalTime().isBefore(endWorkingHour)) {
        LocalDateTime finalSlot = slot;
        boolean isSlotAvailable = appointments.stream()
            .noneMatch(appointment -> finalSlot.isBefore(appointment.getEndTime()) &&
                slotEnd.isAfter(appointment.getStartTime()));

        if (isSlotAvailable) {
          availableSlots.add(new TimeSlotDTO(finalSlot, slotEnd));
        }
      }

      slot = slot.plusMinutes(service.getDurationMinutes());
    }

    return availableSlots;
  }


  @Override
  public List<AppointmentResponseDTO> getFutureAppointmentsForClient(Long clientId) {
    User client = userService.getUser(clientId);

    if (client.getRole() != Role.USER) {
      throw new AppointmentInvalidData("The user is not a client.");
    }

    List<Appointment> futureAppointments = appointmentRepository.findByClientAndStartTimeAfter(
        client, LocalDateTime.now());

    return futureAppointments.stream()
        .map(appointmentMapper::entityToResponse)
        .toList();
  }

  @Override
  public List<AppointmentResponseDTO> getFutureAppointmentsForStaff(Long staffId) {
    User staff = userService.getUser(staffId);

    if (staff.getRole() != Role.STAFF_MEMBER) {
      throw new AppointmentInvalidData("The user is not a staff member.");
    }

    List<Appointment> futureAppointments = appointmentRepository.findByStaffAndStartTimeAfter(staff,
        LocalDateTime.now());

    return futureAppointments.stream()
        .map(appointmentMapper::entityToResponse)
        .toList();
  }

  @Override
  public AppointmentResponseDTO cancelAppointment(Long appointmentId) {
    Appointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));

    appointment.setStatus(Status.CANCELLED);
    Appointment canceledAppointment = appointmentRepository.save(appointment);

    String formattedDateTime = appointment.getStartTime().format(formatter);
    emailService.sendEmail(appointment.getClient().getEmail(),
        appointment.getClient().getFirstName(), appointment.getClient().getLastName(),
        "Appointment Canceled",
        "Your appointment on " + formattedDateTime + " has been canceled.");

    return appointmentMapper.entityToResponse(canceledAppointment);
  }

  @Override
  public Page<AppointmentResponseDTO> getAll(String status, Pageable pageable) {
    Specification<Appointment> spec = buildSpecification(status);
    return appointmentRepository.findAll(spec, pageable)
        .map(appointmentMapper::entityToResponse);
  }


  private void validateAppointment(User client, User staff, Service service,
      LocalDateTime startTime, LocalDateTime endTime) {

    if (client.getRole() != Role.USER) {
      throw new AppointmentInvalidData("The client must have the USER role.");
    }

    if (staff.getRole() != Role.STAFF_MEMBER) {
      throw new AppointmentInvalidData("The staff member must have the STAFF_MEMBER role.");
    }

    if (!service.getUsers().contains(staff)) {
      throw new AppointmentInvalidData(
          "The staff member is not assigned to the selected service.");
    }

    LocalDateTime staffStartWorkingTime = LocalDateTime.of(startTime.toLocalDate(),
        startWorkingHour);
    LocalDateTime staffEndWorkingTime = LocalDateTime.of(startTime.toLocalDate(),
        endWorkingHour);

    if (startTime.isBefore(staffStartWorkingTime) || endTime.isAfter(staffEndWorkingTime)) {
      throw new AppointmentInvalidData(
          "The appointment time is outside of the staff member's working hours.");
    }

    boolean isOverlapping = appointmentRepository.existsByStaffAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
        staff, startTime, endTime);
    if (isOverlapping) {
      throw new AppointmentInvalidData(
          "The staff member has another appointment during the requested time.");
    }
  }

  private Specification<Appointment> buildSpecification(String status) {
    Specification<Appointment> spec = Specification.where(null);

    if (StringUtils.hasText(status)) {
      Status appointmentStatus = Status.valueOf(status.toUpperCase());
      spec = spec.and(AppointmentSpecifications.hasStatus(appointmentStatus));
    }

    return spec;
  }
}
