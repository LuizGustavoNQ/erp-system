package com.luiz.erp_system.security;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordConstraintValidator
        implements ConstraintValidator<PasswordValidator, String> {


    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        if(password == null){
            return false;
        }

        return password.matches(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$"
        );
    }
}