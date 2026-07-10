package com.luiz.erp_system.dto;

import com.luiz.erp_system.entity.Cargo;

public record UsuarioRequestDTO (
    String nome,
    String email,
    String senha,
    Cargo cargo
) {}