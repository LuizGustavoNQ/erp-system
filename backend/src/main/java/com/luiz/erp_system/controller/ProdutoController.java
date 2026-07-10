package com.luiz.erp_system.controller;

import com.luiz.erp_system.dto.ProdutoDTO;
import com.luiz.erp_system.entity.Produto;
import com.luiz.erp_system.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    // Listar todos os produtos

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Produto> criar(
            @Valid @RequestBody ProdutoDTO dto
    ) {
        Produto salvo = produtoService.salvar(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(
            @PathVariable Long id,
            @RequestBody Produto produto
    ) {
        Produto produtoAtual = produtoService.buscarPorId(id);

        produtoAtual.setNome(produto.getNome());
        produtoAtual.setDescricao(produto.getDescricao());
        produtoAtual.setPreco(produto.getPreco());
        produtoAtual.setQuantidadeEstoque(produto.getQuantidadeEstoque());
        produtoAtual.setAtivo(produto.isAtivo());

        return ResponseEntity.ok(
                produtoService.atualizar(produtoAtual)
        );
    }

    // Deletar produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        produtoService.deletar(id);

        return ResponseEntity.noContent().build();
    }
}
