# ERP System

Um sistema ERP simples desenvolvido para estudos e portfólio utilizando **Java Spring Boot**, **React**, **PostgreSQL** e **Docker**.

O objetivo do projeto é praticar conceitos de desenvolvimento full stack, arquitetura REST, persistência de dados e integração entre frontend e backend.

---

## Preview do Sistema

Confira algumas telas do ERP:

### Tela Inicial
Dashboard principal do sistema com visão geral das funcionalidades.

<img width="100%" alt="Tela Inicial" src="https://github.com/user-attachments/assets/25eb39d9-e306-493a-a817-4056fc83a520" />

---

### Gestão de Clientes
Tela responsável pelo cadastro, consulta e gerenciamento dos clientes.

<img width="100%" alt="Tela Clientes" src="https://github.com/user-attachments/assets/ab1368c4-59fa-46de-a853-70f96a41afa4" />

---

### Gestão de Produtos
Módulo para controle de produtos, estoque e informações dos itens cadastrados.

<img width="100%" alt="Tela Produtos" src="https://github.com/user-attachments/assets/bf8c22e1-39c9-4ec9-a48b-a65c3f5d1e0d" />

---

### Módulo de Vendas
Tela para criação e gerenciamento de vendas, integrando clientes, produtos e controle de pedidos.

<img width="100%" alt="Tela Vendas" src="https://github.com/user-attachments/assets/c6b9922e-cbf1-444b-b555-1cae7d41335c" />

## Funcionalidades

### Autenticação
- Login de usuários
- Cadastro de usuários
- Controle de acesso

### Produtos
- Cadastro de produtos
- Atualização de produtos
- Exclusão de produtos
- Listagem de produtos
- Controle de estoque

### Clientes
- Cadastro de clientes
- Atualização de clientes
- Exclusão de clientes
- Listagem de clientes

### Vendas
- Registro de vendas
- Controle de itens da venda
- Atualização automática do estoque
- Cálculo automático do valor total
- Controle de status da venda

---

## Tecnologias utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- Hibernate
- Maven

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Axios

### Banco de dados
- PostgreSQL

### Infraestrutura
- Docker
- Docker Compose

---

## Estrutura do projeto

```text
erp-system/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

## Executando com Docker

### Pré-requisitos

- Docker Desktop instalado

Clone o projeto:

```bash
git clone https://github.com/LuizGustavoNQ/erp-system.git
cd erp-system
```

Inicie todos os serviços:

```bash
docker compose up -d
```

Após a inicialização:

| Serviço | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8081 |
| PostgreSQL | localhost:5432 |

---

## Executando manualmente

### Backend

Requisitos:

- Java 21
- Maven
- PostgreSQL

Crie o banco:

```sql
CREATE DATABASE erp_db;
```

Configure o arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/erp_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Execute:

```bash
cd backend
./mvnw spring-boot:run
```

ou:

```bash
mvn spring-boot:run
```

---

### Frontend

Requisitos:

- Node.js 22+

Instale as dependências:

```bash
cd frontend
npm install
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## Endpoints da API

### Produtos

| Método | Endpoint |
|--------|----------|
| GET | `/produtos` |
| POST | `/produtos` |
| PUT | `/produtos/{id}` |
| DELETE | `/produtos/{id}` |

---

### Clientes

| Método | Endpoint |
|--------|----------|
| GET | `/clientes` |
| POST | `/clientes` |
| PUT | `/clientes/{id}` |
| DELETE | `/clientes/{id}` |

---

### Vendas

| Método | Endpoint |
|--------|----------|
| POST | `/vendas` |

Exemplo:

```json
{
  "itens": [
    {
      "produtoId": 1,
      "quantidade": 2
    }
  ]
}
```

---

## Banco de dados

Principais entidades:

- Usuário
- Produto
- Cliente
- Venda
- ItemVenda

---

## Funcionalidades futuras

- Dashboard
- Relatórios
- Cancelamento de vendas
- Movimentações de estoque
- Exportação de relatórios
- Deploy em produção

---

## Aprendizados

Este projeto foi desenvolvido com foco em aprendizado e prática dos seguintes conceitos:

- APIs REST
- Arquitetura em camadas
- DTOs
- Relacionamentos JPA
- Controle transacional
- Integração frontend/backend
- Persistência com PostgreSQL
- Containerização com Docker

---

## Autor

### Luiz Gustavo

Estudante de Engenharia de Software na UTFPR e desenvolvedor back-end Java.

- LinkedIn: www.linkedin.com/in/luiznq/

---

