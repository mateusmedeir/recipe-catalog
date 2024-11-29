<h1 align="center">Sofex Test</h1>

## Funcionalidades
- Autenticação (com token JWT via cookie)
    - Login de usuário
    - Cadastro de usuário
- Receitas
    - Listagem de receitas
        - Opções de filtro por nome e dificuldade da receita
        - Cards das receitas com opção de deleção (soft-delete)
    - Modal com detalhes da receita selecionada

## Design System
Para este projeto, escolhi para o design system utilizar o [shadcn](https://shadcn.dev/).

## Organização das Pastas
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
│   │   ├── common/               # Componentes comuns (decorators, enums, guards, etc.)
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
        │   │   ├── common/       # Componentes gerais
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

## Como começar
1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/sofex-test.git
    ```
2. Navegue para a pasta do projeto:
    ```sh
    cd sofex-test
    ```

### Front-end
1. Instale as dependências do frontend:
    ```sh
    cd sofex-test/frontend
    yarn
    ```
2. Inicie o frontend:
    ```sh
    yarn dev
    ```

### Back-end
1. Instale as dependências do backend:
    ```sh
    cd ../backend
    npm install
    ```
2. Inicie o backend:
    ```sh
    cd ../backend
    yarn start:dev
    ```