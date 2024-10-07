package com.flow.domain.service.repository;

import com.flow.domain.service.entity.Service;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends
    JpaRepository<Service, Long> {

  boolean existsByName(String name);

  List<Service> findAllById(Iterable<Long> ids);
}
