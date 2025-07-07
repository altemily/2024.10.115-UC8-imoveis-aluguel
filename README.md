# 🏠 API RESTful - Cadastro de Imóveis com Autenticação JWT

Este projeto consiste em uma API RESTful desenvolvida com Node.js, Express e Sequelize para cadastro de imóveis disponíveis para aluguel. Inclui autenticação com tokens JWT, rotas protegidas, e persistência em banco de dados PostgreSQL.

---

## 📚 Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL
* Sequelize (ORM)
* JWT (JSON Web Token)
* bcrypt.js
* dotenv
* cookie-parser
* cors

---


## ⚙️ Configuração do Ambiente

### 1. Clonar o repositório

```bash
git clone https://github.com/altemily/cadastro-aluguel-imoveis
cd cadastro-aluguel-imoveis
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar o arquivo `.env`

Crie um arquivo `.env` com base no `.env.example`.

```

### 4. Subir o banco de dados PostgreSQL

Garanta que o PostgreSQL esteja rodando localmente com um banco criado com o nome informado no `.env`.

### 5. Rodar o projeto

```bash
node index.js
```

---

## 🔐 Autenticação JWT

O sistema utiliza autenticação baseada em JWT. O login gera:

* **Token de acesso** (`tokenAcesso`) enviado no body
* **Refresh token** armazenado em cookie HTTP-only

Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 🔀 Endpoints

### 🔑 Autenticação

| Método | Rota                 | Ação                          |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/login`         | Login e geração de tokens     |
| POST   | `/api/refresh-token` | Gera novo token de acesso     |
| POST   | `/api/logout`        | Encerra sessão (limpa cookie) |

---

### 👤 Usuário

| Método | Rota            | Protegida | Ação                     |
| ------ | --------------- | --------- | ------------------------ |
| POST   | `/api/usuarios` | ❌         | Criação de usuário       |
| GET    | `/api/usuarios` | ✅         | Listar todos os usuários |

---

### 🏠 Imóveis

| Método | Rota               | Protegida | Ação                    |
| ------ | ------------------ | --------- | ----------------------- |
| GET    | `/api/imoveis`     | ❌         | Listar todos os imóveis |
| GET    | `/api/imoveis/:id` | ❌         | Buscar imóvel por ID    |
| POST   | `/api/imoveis`     | ✅         | Criar novo imóvel       |
| PUT    | `/api/imoveis/:id` | ✅         | Atualizar imóvel por ID |
| DELETE | `/api/imoveis/:id` | ✅         | Deletar imóvel por ID   |

---

## 🧪 Testes no Insomnia

* Faça login via `POST /api/login` e copie o `tokenAcesso`
* Em rotas protegidas, use nos headers:

```
Authorization: Bearer SEU_TOKEN
```

---

## ✅ Regras de Validação

### Usuário

* Email único e válido
* Senha com:

  * mínimo 8 caracteres
  * letra maiúscula e minúscula
  * número
  * caractere especial

### Imóvel

* Campos obrigatórios: `endereco`, `tipo`, `valor_aluguel`, `proprietario_nome`
* Campo `fotos`: array de URLs

---


## 👩‍💼 Desenvolvido por

* Ariane Carvalho
* Aluna - Técnico em Desenvolvimento de Sistemas - SenacRN

---

## 📄 Licença

Sob licença MIT. Este projeto é apenas para fins acadêmicos e didáticos. 
