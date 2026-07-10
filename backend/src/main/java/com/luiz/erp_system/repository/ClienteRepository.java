package com.luiz.erp_system.repository;

import com.luiz.erp_system.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}