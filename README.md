# Node.js API de Gestão de Usuários

API RESTful desenvolvida em **Node.js** com o framework **Express**, que permite realizar operações de **CRUD** (Criar, Ler, Atualizar e Deletar) para gerenciar usuários.

> Projeto desenvolvido como parte da Pós-Graduação na **PUC Minas** – Qualidade de Software e Testes.

---

## ⚙️ Funcionalidades

- **CRUD de Usuários**:
  - Criar um novo usuário
  - Listar todos os usuários
  - Buscar usuário por ID
  - Atualizar informações de um usuário
  - Deletar um usuário

- **Validações**:
  - Validação de e-mail
  - Verificação de campos obrigatórios
  - Garantia de unicidade do e-mail

- **Segurança**:
  - Hash de senhas com `bcrypt`

- **Testes**:
  - Testes unitários para validação de e-mail
  - Testes de sistema para rotas de usuário com `supertest` e `mongodb-memory-server`

---

## 🛠️ Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - Mongoose

- **Banco de Dados**:
  - MongoDB

- **Testes**:
  - Jest
  - Supertest
  - mongodb-memory-server

- **Outras Dependências**:
  - `bcrypt` – para hash de senhas
  - `dotenv` – gerenciamento de variáveis de ambiente
  - `cors` – habilitação de CORS

---

## 🚀 Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker (para rodar o MongoDB com Docker Compose)

### 📦 Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/EderF-Silva/node-js-api-gestao-usuarios.git
cd node-js-api-gestao-usuarios
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
PORT=3000
MONGODB_URI=mongodb://admin:localhost-debug@localhost:27017/users_db?authSource=admin
```

4. Inicie o MongoDB com Docker Compose:

```bash
docker-compose up -d
```

5. Inicie o servidor:
```bash
npm start
```

## 📌 Endpoints da API

**Base URL:** `/users`

| Método  | Rota    | Descrição                                      |
|---------|---------|------------------------------------------------|
| GET     | `/`     | Lista todos os usuários (sem o campo password) |
| GET     | `/:id`  | Retorna um usuário específico pelo ID          |
| POST    | `/`     | Cria um novo usuário                           |
| PUT     | `/:id`  | Atualiza um usuário específico                 |
| DELETE  | `/:id`  | Deleta um usuário específico                   |

### 🧪 Executando Testes
Execute os testes unitários e de sistema com o comando:

```bash
npm test
```

Os testes incluem:

- **Testes unitários**: Validação de e-mail.
- **Testes de sistema**: Operações de CRUD para usuários.

## 🧑‍💻 Autor
Desenvolvido por **Eder Silva.**  


