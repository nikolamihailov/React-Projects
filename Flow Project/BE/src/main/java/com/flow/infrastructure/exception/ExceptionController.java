package com.flow.infrastructure.exception;

import com.flow.infrastructure.exception.appointment.AppointmentInvalidData;
import com.flow.infrastructure.exception.appointment.AppointmentNotFoundException;
import com.flow.infrastructure.exception.service.ServiceAlreadyExistsException;
import com.flow.infrastructure.exception.service.ServiceNotFoundException;
import com.flow.infrastructure.exception.user.UserAlreadyExistsException;
import com.flow.infrastructure.exception.user.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class ExceptionController {

  @ExceptionHandler(ResponseStatusException.class)
  public ProblemDetail handleResponseStatusException(ResponseStatusException ex) {
    return ProblemDetail.forStatusAndDetail(ex.getStatusCode(), ex.getReason());
  }

  @ExceptionHandler(UserNotFoundException.class)
  public ProblemDetail handleUserNotFoundException(UserNotFoundException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(UserAlreadyExistsException.class)
  public ProblemDetail handleUserAlreadyExistsException(UserAlreadyExistsException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
        "Data integrity violation: " + e.getMessage());
  }

  @ExceptionHandler(ServiceNotFoundException.class)
  public ProblemDetail handleServiceNotFoundException(ServiceNotFoundException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(ServiceAlreadyExistsException.class)
  public ProblemDetail handleServiceAlreadyExistsException(ServiceAlreadyExistsException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
        "Data integrity violation: " + e.getMessage());
  }

  @ExceptionHandler(AppointmentNotFoundException.class)
  public ProblemDetail handleAppointmentNotFoundException(AppointmentNotFoundException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(AppointmentInvalidData.class)
  public ProblemDetail handleAppointmentInvalidData(AppointmentInvalidData e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
  }


  @ExceptionHandler(IllegalArgumentException.class)
  public ProblemDetail handleIllegalArgumentException(IllegalArgumentException ex) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage()));

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
        "Validation Failed");
    problemDetail.setProperty("errors", errors);

    return problemDetail;
  }

}