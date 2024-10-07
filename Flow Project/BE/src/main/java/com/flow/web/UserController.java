package com.flow.web;

import com.flow.domain.user.dto.UserRequestDTO;
import com.flow.domain.user.dto.UserResponseDTO;
import com.flow.domain.user.dto.UserUpdateRequestDTO;
import com.flow.domain.user.dto.UserWithRoleStaffRequestDTO;
import com.flow.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<UserResponseDTO> add(@Valid @RequestBody UserRequestDTO dto) {
    final var createdUser = userService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  @Operation(description = "Adding staff member")
  @PostMapping("/add-staff-member")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<UserResponseDTO> addStaffMember(
      @Valid @RequestBody UserWithRoleStaffRequestDTO dto) {
    final var createdUser = userService.createStaffMember(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  @Operation(description = "Get a list of paginated users filtered by role")
  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Page<UserResponseDTO>> get(
      @RequestParam(required = false) String role,
      Pageable pageable) {
    return ResponseEntity.ok(userService.getAll(role, pageable));
  }

  @Operation(description = "Get a single user by id")
  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getById(id));
  }

  @Operation(description = "Updating user by id")
  @PatchMapping("/{id}")
  public ResponseEntity<UserResponseDTO> update(@PathVariable Long id,
      @Valid @RequestBody UserUpdateRequestDTO dto) {
    return ResponseEntity.ok(userService.updateById(id, dto));
  }

  @Operation(description = "Deleting user by id")
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    userService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
