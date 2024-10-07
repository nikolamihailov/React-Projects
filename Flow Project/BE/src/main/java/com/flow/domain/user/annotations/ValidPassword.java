package com.flow.domain.user.annotations;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordConstraintValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)

public @interface ValidPassword {

  String message() default "Invalid Password";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}