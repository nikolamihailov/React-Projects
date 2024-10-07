package com.flow.domain.service.entity;

import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "services")
public class Service {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Name is required")
  @Size(min = 1, max = 50, message = "Must be 1-50 characters")
  @Column(nullable = false, length = 50, unique = true)
  private String name;

  @NotBlank(message = "Description is required")
  @Size(min = 1, max = 200, message = "Must be 1-200 characters")
  @Column(nullable = false, length = 200)
  private String description;

  @Min(value = 0, message = "Duration must be above 0")
  @Max(value = 300, message = "Duration must not be over 300")
  @Column(nullable = false)
  private short durationMinutes;

  @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
  @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount with up to 2 decimal places")
  @Column(nullable = false)
  private BigDecimal price;

  @ManyToMany(mappedBy = "services")
  private Set<User> users;

  @OneToMany(mappedBy = "service")
  private Set<Appointment> appointments;


  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public @NotBlank(message = "Name is required") @Size(min = 1, max = 50, message = "Must be 1-50 characters") String getName() {
    return name;
  }

  public void setName(
      @NotBlank(message = "Name is required") @Size(min = 1, max = 50, message = "Must be 1-50 characters") String name) {
    this.name = name;
  }

  public @NotBlank(message = "Description is required") @Size(min = 1, max = 200, message = "Must be 1-200 characters") String getDescription() {
    return description;
  }

  public void setDescription(
      @NotBlank(message = "Description is required") @Size(min = 1, max = 200, message = "Must be 1-200 characters") String description) {
    this.description = description;
  }

  @Min(value = 0, message = "Duration must be above 0")
  @Max(value = 300, message = "Duration must not be over 300")
  public short getDurationMinutes() {
    return durationMinutes;
  }

  public void setDurationMinutes(
      @Min(value = 0, message = "Duration must be above 0") @Max(value = 300, message = "Duration must not be over 300") short durationMinutes) {
    this.durationMinutes = durationMinutes;
  }

  public @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0") @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount with up to 2 decimal places") BigDecimal getPrice() {
    return price;
  }

  public void setPrice(
      @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0") @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount with up to 2 decimal places") BigDecimal price) {
    this.price = price;
  }

  public Set<Appointment> getAppointments() {
    return appointments;
  }

  public void setAppointments(Set<Appointment> appointments) {
    this.appointments = appointments;
  }
}
