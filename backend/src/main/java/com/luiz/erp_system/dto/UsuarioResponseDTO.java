package com.luiz.erp_system.dto;

import com.luiz.erp_system.entity.Cargo;

public record UsuarioResponseDTO (
   Long id,
   String nome,
   String email,
   Cargo cargo,
   Boolean ativo
){ }
