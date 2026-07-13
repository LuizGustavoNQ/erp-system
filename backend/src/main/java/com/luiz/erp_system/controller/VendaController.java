package com.luiz.erp_system.controller;

import com.luiz.erp_system.dto.VendaDTO;
import com.luiz.erp_system.entity.Vendas;
import com.luiz.erp_system.service.VendaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendaController {

    private final VendaService vendaService;

    public VendaController(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @PostMapping
    public ResponseEntity<Vendas> realizarVenda(
            @RequestBody VendaDTO dto
    ) {

        Vendas venda = vendaService.realizarVenda(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(venda);
    }

    @GetMapping
    public ResponseEntity<List<Vendas>> listarTodas() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendas> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vendaService.buscarPorId(id));
    }
}
