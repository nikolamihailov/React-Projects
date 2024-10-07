package com.flow.web;

import com.flow.domain.user.dto.UserResponseDTO;
import com.flow.domain.user.service.UserService;
import com.flow.infrastructure.security.JwtService;
import com.flow.infrastructure.security.dto.AuthenticationRequest;
import com.flow.infrastructure.security.dto.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final JwtService jwtService;

  public AuthController(AuthenticationManager authenticationManager, UserService userService,
      JwtService jwtService) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.email(), request.password()));

    var response = new AuthenticationResponse(jwtService.generateToken(request.email()));

    return ResponseEntity.ok(response);
  }

  @GetMapping("/logged-in")
  public ResponseEntity<UserResponseDTO> getLoggedUser() {
    return ResponseEntity.ok(userService.getLoggedUser());
  }
}
