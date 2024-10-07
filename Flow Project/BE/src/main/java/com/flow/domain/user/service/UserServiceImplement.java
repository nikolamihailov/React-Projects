package com.flow.domain.user.service;

import com.flow.domain.service.repository.ServiceRepository;
import com.flow.domain.user.dto.UserRequestDTO;
import com.flow.domain.user.dto.UserResponseDTO;
import com.flow.domain.user.dto.UserUpdateRequestDTO;
import com.flow.domain.user.dto.UserWithRoleStaffRequestDTO;
import com.flow.domain.user.entity.Role;
import com.flow.domain.user.entity.User;
import com.flow.domain.user.mapper.UserMapper;
import com.flow.domain.user.repository.UserRepository;
import com.flow.domain.user.repository.UserSpecifications;
import com.flow.infrastructure.exception.service.ServiceNotFoundException;
import com.flow.infrastructure.exception.user.UserAlreadyExistsException;
import com.flow.infrastructure.exception.user.UserNotFoundException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImplement implements UserService {

  private final UserRepository userRepository;
  private final ServiceRepository serviceRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  public UserServiceImplement(UserRepository userRepository, ServiceRepository serviceRepository,
      UserMapper userMapper,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.serviceRepository = serviceRepository;
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserResponseDTO create(UserRequestDTO dto) {

    if (userRepository.existsByEmail(dto.email())) {
      throw new UserAlreadyExistsException("User with email '" + dto.email() + "' already exists.");
    }

    User user = userMapper.requestToEntity(dto);
    user.setPassword(passwordEncoder.encode(dto.password()));
    user.setRole(Role.USER);
    final var createdUser = userRepository.save(user);

    return userMapper.entityToResponse(createdUser);
  }

  @Override
  public UserResponseDTO createStaffMember(UserWithRoleStaffRequestDTO dto) {

    if (userRepository.existsByEmail(dto.email())) {
      throw new UserAlreadyExistsException("User with email '" + dto.email() + "' already exists.");
    }

    List<com.flow.domain.service.entity.Service> services = serviceRepository.findAllById(
        dto.serviceIds());

    if (services.size() != dto.serviceIds().size()) {
      throw new ServiceNotFoundException("One or more Service IDs not found");
    }

    User user = userMapper.requestToEntityStaff(dto);
    user.setPassword(passwordEncoder.encode(dto.password()));
    user.setRole(Role.STAFF_MEMBER);
    user.setServices(new HashSet<>(services));

    final var createdUser = userRepository.save(user);

    return userMapper.entityToResponse(createdUser);
  }

  @Override
  public Page<UserResponseDTO> getAll(String role, Pageable pageable) {
    Specification<User> spec = buildSpecification(role);

    return userRepository.findAll(spec, pageable)
        .map(userMapper::entityToResponse);
  }

  @Override
  public UserResponseDTO getById(Long id) {
    User user = getUser(id);

    if (!canAccess(id)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
    }

    return userMapper.entityToResponse(user);
  }

  @Override
  public UserResponseDTO getLoggedUser() {
    User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    User userWithServices = userRepository.findByIdWithServices(currentUser.getId());
    return userMapper.entityToResponse(userWithServices);
  }

  @Override
  public UserResponseDTO updateById(Long id, UserUpdateRequestDTO dto) {
    User user = getUser(id);

    if (!canAccess(id)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
    }

    if (userRepository.existsByEmail(dto.email()) && !user.getEmail().equals(dto.email())) {
      throw new UserAlreadyExistsException("User with email '" + dto.email() + "' already exists.");
    }

    userMapper.update(user, dto);

    List<com.flow.domain.service.entity.Service> serviceList = new ArrayList<>();
    if (dto.serviceIds() != null && !dto.serviceIds().isEmpty()) {
      serviceList = serviceRepository.findAllById(dto.serviceIds());
    }

    Set<com.flow.domain.service.entity.Service> serviceSet = new HashSet<>(serviceList);
    user.setServices(serviceSet);

    final var updatedUser = userRepository.save(user);
    return userMapper.entityToResponse(updatedUser);
  }

  @Override
  public void deleteById(Long id) {
    boolean userExists = userRepository.existsById(id);

    if (!userExists) {
      throw new UserNotFoundException("User with id: " + id + " not found");
    }

    userRepository.deleteById(id);
  }

  public User getUser(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("User with id: " + id + " not found"));
  }

  private static boolean canAccess(Long id) {
    User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return currentUser.getId().equals(id) || currentUser.getAuthorities()
        .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
  }

  private Specification<User> buildSpecification(String role) {
    Specification<User> spec = Specification.where(null);

    if (StringUtils.hasText(role)) {
      Role userRole = Role.valueOf(role.toUpperCase());
      spec = spec.and(UserSpecifications.hasRole(userRole));
    }

    return spec;
  }
}
