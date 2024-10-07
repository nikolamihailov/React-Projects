package com.flow.domain.user.entity;

import com.flow.domain.appointment.entity.Appointment;
import com.flow.domain.service.entity.Service;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Email(message = "Invalid email")
  @NotBlank(message = "Email is required")
  @Column(nullable = false, unique = true)

  private String email;

  @NotBlank(message = "First name is required")
  @Size(min = 1, max = 50, message = "Must be 1-50 characters")
  @Column(nullable = false, length = 50)
  private String firstName;

  @NotBlank(message = "Last name is required")
  @Size(min = 1, max = 50, message = "Must be 1-50 characters")
  @Column(nullable = false, length = 50)
  private String lastName;

  @Column(nullable = false)
  private String password;

  @NotBlank(message = "Phone is required")
  @Pattern(regexp = "^\\+?\\d+$", message = "Invalid phone number")
  @Column(length = 25)
  private String phone;

  @Min(value = 0, message = "Age must be above 0")
  @Max(value = 120, message = "Age must not be over 120")
  @Column(nullable = false)
  private short age;

  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToMany
  @JoinTable(
      name = "user_service",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "service_id")
  )
  private Set<Service> services = new HashSet<>();

  public Set<Service> getServices() {
    return services;
  }

  public void setServices(Set<Service> services) {
    this.services = services;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public short getAge() {
    return age;
  }

  public void setAge(short age) {
    this.age = age;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

 /* public List<Appointment> getClientAppointments() {
    return clientAppointments;
  }

  public void setClientAppointments(List<Appointment> clientAppointments) {
    this.clientAppointments = clientAppointments;
  }

  public List<Appointment> getStaffAppointments() {
    return staffAppointments;
  }

  public void setStaffAppointments(List<Appointment> staffAppointments) {
    this.staffAppointments = staffAppointments;
  }*/

  @Override
  public boolean isEnabled() {
    return UserDetails.super.isEnabled();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return UserDetails.super.isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return UserDetails.super.isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return UserDetails.super.isCredentialsNonExpired();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return age == user.age && Objects.equals(id, user.id) && Objects.equals(email, user.email)
        && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName)
        && Objects.equals(password, user.password) && Objects.equals(phone, user.phone);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, firstName, lastName, password, phone, age);
  }
}
