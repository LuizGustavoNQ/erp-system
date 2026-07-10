package com.luiz.erp_system.service;

import com.luiz.erp_system.dto.UsuarioRequestDTO;
import com.luiz.erp_system.dto.UsuarioResponseDTO;
import com.luiz.erp_system.entity.Usuario;
import com.luiz.erp_system.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO dto) {
        if(usuarioRepository.existsByEmail((dto.email()))) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(
                passwordEncoder.encode(dto.senha())
        );
        usuario.setCargo(dto.cargo());
        usuario.setAtivo(true);

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getCargo(),
                usuarioSalvo.isAtivo()
        );
    }
}
