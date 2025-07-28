# 🏠 API RESTful - Cadastro de Imóveis para Aluguel

Este projeto é uma API RESTful desenvolvida em Node.js, Express e Sequelize, focada no cadastro e gerenciamento de imóveis disponíveis para aluguel. O sistema oferece autenticação e autorização via JWT, validação robusta de dados com express-validator, e persistência em banco de dados PostgreSQL. Todas as funcionalidades seguem boas práticas de organização de código, segurança e documentação.

---

## 🚀 Como funciona

- **Cadastro e autenticação de usuários**: O sistema permite criar usuários, autenticar via JWT, e gerenciar perfis.
- **Gerenciamento de proprietários**: Apenas administradores podem cadastrar, editar e remover proprietários de imóveis.
- **Gerenciamento de imóveis**: Apenas proprietários autenticados ou administradores podem cadastrar, atualizar ou remover imóveis. Qualquer pessoa pode consultar os imóveis disponíveis.
- **Relacionamentos**: Cada imóvel pertence a um proprietário. Todo cadastro/edição de imóvel exige um proprietário válido.
- **Validação**: Todos os dados de entrada são validados automaticamente, evitando inconsistências no banco.
- **Segurança**: Rotas protegidas por autenticação JWT e controle de autorização por perfil (role).
- **Tokens**: O login retorna um token de acesso JWT e um refresh token (em cookie httpOnly) para renovar sessões.

---

## 📚 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JWT (JSON Web Token)
- bcrypt.js
- dotenv
- express-validator
- cookie-parser
- cors

---

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**
    ```bash
    git clone https://github.com/altemily/2024.10.115-UC8-imoveis-aluguel
    cd 2024.10.115-UC8-imoveis-aluguel
    ```

2. **Instale as dependências**
    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente**
    - Copie o arquivo `.env.example` para `.env` e preencha conforme seu ambiente.

4. **Configure o banco de dados**
    - Garanta que o PostgreSQL esteja rodando e o banco criado com o nome informado no `.env`.

5. **Inicie o projeto**
    ```bash
    node index.js
    ```

---

## 🔐 Autenticação JWT

- O login (`/api/auth/login`) devolve um **token de acesso** e um **refresh token**.
- O **token de acesso** deve ser enviado no header das rotas protegidas:
    ```
    Authorization: Bearer SEU_TOKEN
    ```
- O **refresh token** é salvo automaticamente como cookie httpOnly.

---

## 🔀 Endpoints Principais

### 🔑 Autenticação

| Método | Rota                     | Ação                           |
|--------|--------------------------|--------------------------------|
| POST   | `/api/auth/login`        | Login e geração de tokens      |
| POST   | `/api/auth/refresh-token`| Gera novo token de acesso      |
| POST   | `/api/auth/logout`       | Encerra sessão (logout)        |

---

### 👤 Usuário

| Método | Rota                | Protegida | Permissão             | Ação                        |
| ------ | ------------------- | --------- | --------------------- | --------------------------- |
| POST   | `/api/usuarios`     | ❌        | Público               | Criação de usuário          |
| GET    | `/api/usuarios/me`  | ✅        | Qualquer autenticado  | Perfil do usuário logado    |
| PUT    | `/api/usuarios/me`  | ✅        | Qualquer autenticado  | Atualizar próprio perfil    |
| DELETE | `/api/usuarios/me`  | ✅        | Qualquer autenticado  | Excluir próprio usuário     |

---

### 👔 Proprietário

| Método | Rota                        | Protegida | Permissão             | Ação                                  |
| ------ | --------------------------- | --------- | --------------------- | ------------------------------------- |
| POST   | `/api/proprietarios`        | ✅        | Admin                 | Criar proprietário                    |
| GET    | `/api/proprietarios`        | ✅        | Admin                 | Listar todos os proprietários         |
| GET    | `/api/proprietarios/:id`    | ✅        | Admin                 | Obter proprietário por ID             |
| PUT    | `/api/proprietarios/:id`    | ✅        | Admin                 | Atualizar proprietário por ID         |
| DELETE | `/api/proprietarios/:id`    | ✅        | Admin                 | Remover proprietário por ID           |
| GET    | `/api/proprietarios/me`     | ✅        | Proprietário          | Perfil do proprietário autenticado    |
| PUT    | `/api/proprietarios/me`     | ✅        | Proprietário          | Atualizar próprio cadastro            |

---

### 🏠 Imóveis

| Método | Rota               | Protegida | Permissão             | Ação                    |
| ------ | ------------------ | --------- | --------------------- | ----------------------- |
| GET    | `/api/imoveis`     | ❌        | Público               | Listar todos os imóveis |
| GET    | `/api/imoveis/:id` | ❌        | Público               | Buscar imóvel por ID    |
| POST   | `/api/imoveis`     | ✅        | Proprietário/Admin    | Criar novo imóvel       |
| PUT    | `/api/imoveis/:id` | ✅        | Proprietário/Admin    | Atualizar imóvel por ID |
| DELETE | `/api/imoveis/:id` | ✅        | Proprietário/Admin    | Deletar imóvel por ID   |

---

## 🚦 Permissões & Segurança

- **Cadastro, edição e exclusão de imóveis e proprietários** requerem autenticação e papel apropriado.
- **Ações de proprietário (CRUD)** são restritas ao papel `admin`.
- **Imóveis**: apenas `proprietario` ou `admin` podem criar, editar ou remover.
- **Listagem de imóveis** é pública.
- Permissões aplicadas por middlewares de autenticação (JWT) e autorização (roles).

---

## 🧪 Testando com Insomnia/Postman

1. Faça login via `POST /api/auth/login` e copie o `tokenAcesso`.
2. Em rotas protegidas, use nos headers:
    ```
    Authorization: Bearer SEU_TOKEN
    ```
3. O refresh token é gerenciado automaticamente via cookies.

---

## ✅ Regras de Validação

### Usuário

- Email único e válido
- Senha:
    - Mínimo 6 caracteres
    - Pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial
- Role obrigatório: `cliente`, `corretor` ou `admin`

### Proprietário

- Nome obrigatório (3 a 100 caracteres)
- Email único e válido
- Telefone obrigatório (8 a 20 caracteres)

### Imóvel

- Campos obrigatórios: `endereco`, `tipo`, `valor_aluguel`, `proprietarioId`
- `tipo`: apenas `apartamento`, `casa` ou `sala comercial`
- `valor_aluguel`: valor positivo
- `disponivel`: padrão `true`
- `fotos`: array de URLs (opcional)

---

## 📂 Estrutura de Pastas

```
src/
  config/
  middleware/
  modules/
    autenticacao/
    usuario/
    proprietario/
    imovel/
.env.example
index.js
README.md
```

---

## 👩‍💼 Desenvolvido por

Ariane Carvalho  
Aluna - Técnico em Desenvolvimento de Sistemas - SenacRN

---

## 📄 Licença

Projeto sob licença MIT. Uso acadêmico e didático.