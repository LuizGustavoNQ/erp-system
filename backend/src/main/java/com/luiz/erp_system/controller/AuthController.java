package com.luiz.erp_system.controller;

import com.luiz.erp_system.dto.LoginRequestDTO;
import com.luiz.erp_system.dto.LoginResponseDTO;
import com.luiz.erp_system.security.JwtService;
import com.luiz.erp_system.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody LoginRequestDTO request
    ) {
        return authService.login(request);
    }
}