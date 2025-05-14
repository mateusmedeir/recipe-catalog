<h1 align="center">Recipe Catalog</h1>
<p align="center"><strong>Desafio técnico</strong></p>

## 📑 Sobre
---
> O objetivo deste desafio foi desenvolver uma aplicação web para gestão de receitas de cozinha, com autenticação e sistema de cadastro de usuários.
---

### Funcionalidades
- Autenticação (com token JWT via cookie):
    - Login de usuário
    - Cadastro de usuário
- Receitas:
    - Listagem de receitas
        - Opções de filtro por nome e dificuldade da receita
        - Exibição em cards com opção de deleção (soft-delete)
    - Modal com detalhes da receita selecionada

### Design System
Para este projeto, optei por utilizar o [shadcn](https://ui.shadcn.com) como design system.

### Organização das Pastas
A estrutura de pastas do projeto está organizada da seguinte forma:

```
sofex-test/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── seeds/                # Seeds do banco de dados
│   │   ├── schema.prisma 
│   ├── src/
│   │   ├── auth/
│   │   ├── common/               # Componentes gerais (decorators, enums, guards, etc.)
│   │   ├── health/
│   │   ├── recipes/
│   │   ├── users/
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── ...
└── frontend/
        ├── public/
        ├── src/
        │   ├── app/
        │   ├── components/
        │   │   ├── common/       # Componentes gerais (topbar, pagination-control, etc.)
        │   │   ├── cards/        # Cards
        │   │   ├── forms/        # Formulários
        │   │   ├── modals/       # Modais
        │   │   ├── sections/     # Seções da Home
        │   │   └── ui/           # Componentes do shadcn
        │   ├── contexts/
        │   ├── hooks/
        │   ├── libs/
        │   │   ├── enums/        # Enums usados no projeto
        │   │   ├── interfaces/   # Interfaces usadas no projeto
        │   │   ├── schemas/      # Schemas usados no projeto
        │   │   └── utils/        # Utilitários
        │   └── services/         # Serviços e chamadas de API
        └── ...
```

## ⚙️ Como começar
1. Clone o repositório:
    ```sh
    git clone git@github.com:mateusmedeir/sofex-test.git
    ```
2. Navegue para a pasta do projeto:
    ```sh
    cd sofex-test
    ```

### Front-end
1. Instale as dependências do frontend:
    ```sh
    cd frontend
    yarn
    ```
2. Inicie o frontend:
    ```sh
    yarn dev
    ```

### Back-end
1. Instale as dependências do backend:
    ```sh
    cd backend
    yarn
    ```
2. Inicie o backend:
    ```sh
    yarn start:dev
    ```
#### Seeds
Para popular o banco de dados com dados iniciais, siga os passos abaixo:
1. Certifique-se de ter o dotenv-cli instalado:
    ```sh
    npm i -g dotenv-cli
    ```
2. Rode a seed de usuários:
    ```sh
    yarn prisma:seed:users
    ```
3. Em seguida, rode a seed das receitas:
    ```sh
    yarn prisma:seed:recipes
    ```
