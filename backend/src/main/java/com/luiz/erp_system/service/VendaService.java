package com.luiz.erp_system.service;

import com.luiz.erp_system.dto.ItemVendaDTO;
import com.luiz.erp_system.dto.VendaDTO;
import com.luiz.erp_system.entity.Cliente;
import com.luiz.erp_system.entity.ItemVenda;
import com.luiz.erp_system.entity.Produto;
import com.luiz.erp_system.entity.StatusVenda;
import com.luiz.erp_system.entity.Vendas;
import com.luiz.erp_system.repository.ClienteRepository;
import com.luiz.erp_system.repository.ProdutoRepository;
import com.luiz.erp_system.repository.VendaRepository;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;

    public VendaService(
            VendaRepository vendaRepository,
            ProdutoRepository produtoRepository,
            ClienteRepository clienteRepository
    ) {
        this.vendaRepository = vendaRepository;
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Vendas realizarVenda(VendaDTO dto) {

        Vendas venda = new Vendas();

        if (dto.getClienteId() != null) {
            Cliente cliente = clienteRepository.findById(dto.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            venda.setCliente(cliente);
        }

        List<ItemVenda> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemVendaDTO itemDto : dto.getItens()) {

            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() ->
                            new RuntimeException("Produto não encontrado"));

            if (produto.getQuantidadeEstoque() < itemDto.getQuantidade()) {
                throw new RuntimeException(
                        "Estoque insuficiente para o produto: "
                                + produto.getNome()
                );
            }

            ItemVenda item = new ItemVenda();

            item.setVenda(venda);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());

            BigDecimal subtotal = produto.getPreco()
                    .multiply(BigDecimal.valueOf(itemDto.getQuantidade()));

            item.setPrecoUnitario(produto.getPreco());
            item.setSubtotal(subtotal);

            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() - itemDto.getQuantidade()
            );

            itens.add(item);
            total = total.add(subtotal);
        }

        venda.setDataVenda(LocalDateTime.now());
        venda.setStatus(StatusVenda.FINALIZADA);
        venda.setValorTotal(total);
        venda.setItens(itens);

        return vendaRepository.save(venda);
    }

    public List<Vendas> listarTodas() {
        return vendaRepository.findAll();
    }

    public Vendas buscarPorId(Long id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada com o ID: " + id));
    }
}