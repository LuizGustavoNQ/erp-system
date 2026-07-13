package com.luiz.erp_system.dto;

import com.luiz.erp_system.entity.Cargo;
import com.luiz.erp_system.security.PasswordValidator;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioRequestDTO(

        @NotBlank(message = "O nome é obrigatório")
        String nome,


        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Digite um email válido")
        String email,


        @PasswordValidator
        String senha,

        Cargo cargo

) {}