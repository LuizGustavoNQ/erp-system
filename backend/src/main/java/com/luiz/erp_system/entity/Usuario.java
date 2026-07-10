package com.luiz.erp_system.entity;

import jakarta.persistence.*;

@Entity // Funcionalidade do Hibernate que diz: "Ei, essa classe representa uma tabela no banco!!"
@Table(name="usuarios")
public class Usuario {

    @Id // Define a chave primária da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Fala para o Postgres gerar uma chave automaticamente.
    private long id;

    private String nome;

    @Column(unique=true) // Define um valor único para cada usuário
    private String email;

    private String senha;

    @Enumerated(EnumType.STRING)
    private Cargo cargo;

    private boolean ativo = true;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
