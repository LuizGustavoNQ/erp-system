package com.luiz.erp_system.service;

import com.luiz.erp_system.entity.Cliente;
import com.luiz.erp_system.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;


    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }


    public List<Cliente> listar() {
        return repository.findAll();
    }


    public Cliente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }


    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }


    public Cliente atualizar(Long id, Cliente dados) {

        Cliente cliente = buscarPorId(id);

        cliente.setNome(dados.getNome());
        cliente.setCpfCnpj(dados.getCpfCnpj());
        cliente.setTelefone(dados.getTelefone());
        cliente.setEmail(dados.getEmail());
        cliente.setEndereco(dados.getEndereco());

        return repository.save(cliente);
    }


    public void deletar(Long id) {
        repository.deleteById(id);
    }
}