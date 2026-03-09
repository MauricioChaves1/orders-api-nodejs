# 📦 API de Gerenciamento de Pedidos — Documentação

Para facilitar os testes da API, uma **Collection do Postman** foi disponibilizada no projeto.

A collection está localizada **na raiz do repositório**, permitindo que qualquer pessoa que clone o projeto consiga importar rapidamente todas as requisições da API.

Arquivo da collection:

orders-api.postman_collection.json

## 📋 Visão Geral

Esta API foi desenvolvida em **Node.js utilizando JavaScript** com o objetivo de gerenciar pedidos de forma simples e organizada. A aplicação permite realizar operações de **CRUD (Create, Read, Update, Delete)** para pedidos.

Além das funcionalidades básicas, o projeto também inclui:

* Sistema de **autenticação e cadastro de usuários**
* **Autenticação via JWT (JSON Web Token)**
* Estrutura baseada no **padrão MVC**
* Uso de **DTOs (Data Transfer Objects)** para transformação e validação de dados
* Persistência de dados utilizando **PostgreSQL**

A API realiza **transformação (mapping) dos dados recebidos** antes de salvá-los no banco de dados.

---

# 🏗 Arquitetura do Projeto

O projeto segue o **padrão MVC (Model - View - Controller)** adaptado para APIs REST.

## Estrutura de Pastas

```
src
 ├ config
 │   └ database.js
 ├ controllers
 │   ├ authController.js
 │   ├ orderController.js
 │   └ registerController.js
 ├ dtos
 │   ├ item
 │   ├ login
 │   ├ order
 │   └ register
 ├ middlewares
 │   └ authMiddleware.js
 ├ migrations
 │   ├ 001_create_users_table.sql
 │   ├ 002_create_orders_table.sql
 │   └ 003_create_items_table.sql
 ├ models
 │   ├ itemModel.js
 │   ├ orderModel.js
 │   └ userModel.js
 ├ repositories
 │   ├ itemRepository.js
 │   ├ orderRepository.js
 │   └ userRepository.js
 ├ routes
 │   └ api.js
 ├ scripts
 │   └ runMigrations.js
 ├ services
 │   ├ authService.js
 │   ├ orderService.js
 │   └ registerService.js
 └ server.js
```

---

# 🧠 Padrões Utilizados

## MVC

A aplicação segue o padrão **MVC**, onde cada camada possui responsabilidade específica.

### Models

Representam as entidades do sistema.

Exemplo:

* Order
* Item
* User

### Controllers

Responsáveis por receber as requisições HTTP e retornar respostas.

### Services

Contêm as **regras de negócio da aplicação**.

### Repositories

Responsáveis pelo acesso ao banco de dados.

---

## DTO (Data Transfer Object)

DTOs foram utilizados para **padronizar e transformar os dados recebidos e enviados pela API**.

### DTO de Requisição

Responsável por validar e transformar os dados recebidos.

Exemplo:

```
reqOrderDto.js
```

### DTO de Resposta

Responsável por formatar os dados retornados ao cliente.

Exemplo:

```
resOrderDto.js
```

---

# 🔐 Sistema de Autenticação

Foi implementado um sistema de autenticação com:

* **Cadastro de usuários**
* **Login**
* **JWT (JSON Web Token)**

O token gerado no login deve ser enviado nas rotas protegidas.

Header utilizado:

```
Authorization: Bearer TOKEN
```

---

# ⚙️ Como Executar o Projeto

## 1️⃣ Instalar dependências

```
npm install
```

⚙️ Configuração do Ambiente (.env)

Antes de executar o projeto é necessário criar um arquivo .env na raiz do projeto com as variáveis de ambiente utilizadas pela aplicação.

Crie o arquivo:

.env

Adicione o seguinte conteúdo:

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=Seu Usuario
DB_PASSWORD=Sua Senha
DB_NAME=orders_db

JWT_SECRET=seu_token_secreto

Essas variáveis são utilizadas para:

Conexão com o banco PostgreSQL

Definição da porta do servidor

Assinatura dos tokens JWT
---

## 2️⃣ Rodar as migrations do banco

Este comando criará as tabelas necessárias no banco de dados.

```
npm run migrate
```

---

## 3️⃣ Iniciar o servidor

```
npm run start
```

Após iniciar, o servidor estará disponível em:

```
http://localhost:3000
```

---

# 📡 Endpoints da API

## 👤 Cadastro de Usuário

### Criar usuário

```
POST /api/register
```

Body:

```json
{
 "name": "mauricio Teste",
 "email": "mauricio@email.com",
 "password": "12345678"
}
```

---

## 🔐 Login

```
POST /api/login
```

Body:

```json
{
 "email": "mauricio@email.com",
 "password": "12345678"
}
```

Resposta:

```json
{
 "token": "JWT_TOKEN"
}
```

---

# 📦 Endpoints de Pedidos

## Criar Pedido

```
POST /order
```

Exemplo de Request:

```json
{
 "numeroPedido": "v10089015vdb-01",
 "valorTotal": 10000,
 "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
 "items": [
  {
   "idItem": "2434",
   "quantidadeItem": 1,
   "valorItem": 1000
  }
 ]
}
```

### Transformação dos dados

Os dados recebidos são transformados antes de serem salvos no banco.

Exemplo:

| Campo recebido | Campo no banco |
| -------------- | -------------- |
| numeroPedido   | order_id       |
| valorTotal     | value          |
| dataCriacao    | creation_date  |

---

## Buscar Pedido por ID

```
GET /order/{numeroPedido}
```

Exemplo:

```
GET /order/v10089016vdb
```

---

## Listar Pedidos

```
GET /order/list
```

Retorna todos os pedidos cadastrados.

---

## Atualizar Pedido

```
PUT /order/{numeroPedido}
```

Exemplo:

```
PUT /order/v10089016vdb
```

---

## Deletar Pedido

```
DELETE /order/{numeroPedido}
```

Exemplo:

```
DELETE /order/v10089016vdb
```

---

# 🗄 Banco de Dados

Foi utilizado **PostgreSQL**.

Tabelas criadas:

* users
* orders
* items

Relacionamento:

```
orders 1 --- N items
```

Cada pedido pode possuir vários itens.

---

# 🧪 Testes da API

Foi disponibilizada uma **Collection do Postman** para facilitar os testes da API.

A collection contém:

* Cadastro de usuário
* Login
* CRUD completo de pedidos

Fluxo recomendado:

1️⃣ Criar usuário
2️⃣ Realizar login
3️⃣ Copiar o token
4️⃣ Utilizar o token nas requisições protegidas
5️⃣ Testar as rotas de pedidos

---

# 📮 Exemplo de Requisição via cURL

```
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
"numeroPedido": "v10089015vdb-01",
"valorTotal": 10000,
"dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
"items": [
{
"idItem": "2434",
"quantidadeItem": 1,
"valorItem": 1000
}
]
}'
```

---

# ✅ Conclusão

Este projeto demonstra a criação de uma API utilizando:

* **Node.js**
* **PostgreSQL**
* **Arquitetura MVC**
* **DTOs**
* **JWT Authentication**
* **Boas práticas de organização de código**

Além disso, a aplicação implementa **transformação de dados (mapping)** antes da persistência no banco, garantindo uma separação clara entre **estrutura da API e estrutura do banco de dados**.

---
