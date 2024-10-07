package com.flow.web;

import com.flow.domain.service.dto.ServiceRequestDTO;
import com.flow.domain.service.dto.ServiceResponseDTO;
import com.flow.domain.service.service.ServiceService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/service")
public class ServiceController {

  private final ServiceService serviceService;

  public ServiceController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @PostMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<ServiceResponseDTO> add(@Valid @RequestBody ServiceRequestDTO dto) {
    final var createdUser = serviceService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  @Operation(description = "Get a list of paginated services")
  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'STAFF_MEMBER')")
  public ResponseEntity<Page<ServiceResponseDTO>> get(Pageable pageable) {
    return ResponseEntity.ok(serviceService.getAll(pageable));
  }

  @Operation(description = "Get a single service by id")
  @GetMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'STAFF_MEMBER')")
  public ResponseEntity<ServiceResponseDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(serviceService.getById(id));
  }

  @Operation(description = "Updating service by id")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PatchMapping("/{id}")
  public ResponseEntity<ServiceResponseDTO> update(@PathVariable Long id,
      @Valid @RequestBody ServiceRequestDTO dto) {
    return ResponseEntity.ok(serviceService.updateById(id, dto));
  }

  @Operation(description = "Deleting service by id")
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    serviceService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
