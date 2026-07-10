package com.luiz.erp_system.service;

import com.luiz.erp_system.dto.LoginRequestDTO;
import com.luiz.erp_system.dto.LoginResponseDTO;
import com.luiz.erp_system.entity.Usuario;
import com.luiz.erp_system.repository.UsuarioRepository;
import com.luiz.erp_system.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        Usuario usuario = usuarioRepository
                .findByEmail(request.email())
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(
                request.senha(),
                usuario.getSenha()
        )) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.generateToken(
                usuario.getEmail()
        );

        return new LoginResponseDTO(token);
    }
}