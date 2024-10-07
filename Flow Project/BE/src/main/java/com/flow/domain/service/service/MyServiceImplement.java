package com.flow.domain.service.service;

import com.flow.domain.service.dto.ServiceRequestDTO;
import com.flow.domain.service.dto.ServiceResponseDTO;
import com.flow.domain.service.entity.Service;
import com.flow.domain.service.mapper.ServiceMapper;
import com.flow.domain.service.repository.ServiceRepository;
import com.flow.infrastructure.exception.service.ServiceAlreadyExistsException;
import com.flow.infrastructure.exception.service.ServiceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@org.springframework.stereotype.Service
public class MyServiceImplement implements ServiceService {

  private final ServiceRepository serviceRepository;
  private final ServiceMapper serviceMapper;

  public MyServiceImplement(ServiceRepository serviceRepository, ServiceMapper serviceMapper) {
    this.serviceRepository = serviceRepository;
    this.serviceMapper = serviceMapper;
  }

  @Override
  public ServiceResponseDTO create(ServiceRequestDTO dto) {

    if (serviceRepository.existsByName(dto.name())) {
      throw new ServiceAlreadyExistsException(
          "Service with name '" + dto.name() + "' already exists.");
    }

    Service service = serviceMapper.requestToEntity(dto);
    final var createdService = serviceRepository.save(service);

    return serviceMapper.entityToResponse(createdService);
  }

  @Override
  public Page<ServiceResponseDTO> getAll(Pageable pageable) {
    return serviceRepository.findAll(pageable).map(serviceMapper::entityToResponse);
  }

  @Override
  public ServiceResponseDTO getById(Long id) {
    Service service = getService(id);

    return serviceMapper.entityToResponse(service);
  }

  @Override
  public ServiceResponseDTO updateById(Long id, ServiceRequestDTO dto) {
    Service service = getService(id);

    if (serviceRepository.existsByName(dto.name()) && !service.getName().equals(dto.name())) {
      throw new ServiceAlreadyExistsException(
          "Service with name '" + dto.name() + "' already exists.");
    }

    serviceMapper.update(service, dto);
    final var updatedService = serviceRepository.save(service);

    return serviceMapper.entityToResponse(updatedService);
  }

  @Override
  public void deleteById(Long id) {
    boolean serviceExists = serviceRepository.existsById(id);

    if (!serviceExists) {
      throw new ServiceNotFoundException("Service with id " + id + " not found");
    }

    serviceRepository.deleteById(id);
  }

  public Service getService(Long id) {
    return serviceRepository.findById(id)
        .orElseThrow(() -> new ServiceNotFoundException("Service with id: " + id + " not found"));
  }
}
