package com.flow.domain.appointment.repository;

import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>,
    JpaSpecificationExecutor<Appointment> {

  boolean existsByStaffAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(User staff,
      LocalDateTime endTime, LocalDateTime startTime);

  @Query("SELECT a FROM Appointment a WHERE a.staff.id = :staffId AND DATE(a.startTime) = :date")
  List<Appointment> findAppointmentsForEmployeeOnDate(
      @Param("staffId") Long staffId,
      @Param("date") LocalDate date
  );

  List<Appointment> findByClientAndStartTimeAfter(User client, LocalDateTime time);

  List<Appointment> findByStaffAndStartTimeAfter(User staff, LocalDateTime time);
}
