package com.flow.domain.user.repository;

import org.springframework.data.jpa.domain.Specification;
import com.flow.domain.user.entity.User;
import com.flow.domain.user.entity.Role;

public class UserSpecifications {

  public static Specification<User> hasRole(Role role) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("role"), role);
  }
}
