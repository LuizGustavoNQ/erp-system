package com.luiz.erp_system.repository;

import com.luiz.erp_system.entity.Vendas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Vendas, Long> {
}
