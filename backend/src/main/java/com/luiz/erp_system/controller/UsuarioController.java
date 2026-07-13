package com.luiz.erp_system.controller;

import com.luiz.erp_system.dto.UsuarioRequestDTO;
import com.luiz.erp_system.dto.UsuarioResponseDTO;
import com.luiz.erp_system.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public UsuarioResponseDTO criarUsuario(
            @RequestBody UsuarioRequestDTO dto
    ) {
        return usuarioService.criarUsuario(dto);
    }
}