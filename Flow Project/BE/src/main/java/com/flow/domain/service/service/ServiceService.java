package com.flow.domain.service.service;

import com.flow.domain.service.dto.ServiceRequestDTO;
import com.flow.domain.service.dto.ServiceResponseDTO;
import com.flow.domain.service.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServiceService {

  ServiceResponseDTO create(ServiceRequestDTO dto);

  Page<ServiceResponseDTO> getAll(Pageable pageable);

  ServiceResponseDTO getById(Long id);

  Service getService(Long id);

  ServiceResponseDTO updateById(Long id, ServiceRequestDTO dto);

  void deleteById(Long id);
}
