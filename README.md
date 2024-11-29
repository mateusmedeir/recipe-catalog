# Sofex Test

## Funcionalidades
- Autenticação (com token JWT via cookie httpOnly)
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
│   │   ├── seeds/
│   │   ├── schema.prisma 
│   ├── src/
│   │   ├── common/           # Componentes comuns (decorators, enums, guards, etc.)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── tests/
│   └── ...
└── frontend/
        ├── public/
        ├── src/
        │   ├── app/              # Páginas do app
        │   ├── components/
        │   │   ├── ...           # Componentes gerais
        │   │   ├── cards/        # Cards
        │   │   ├── forms/        # Formulários
        │   │   ├── modals/       # Modais
        │   │   ├── sections/     # Seções da Home
        │   │   └── ui/           # Componentes do shadcn
        │   ├── context/          # Contextos do React
        │   ├── enums/            # Enums usados no projeto
        │   ├── hooks/            # Hooks personalizados
        │   ├── libs/             # Bibliotecas e utils
        │   ├── services/         # Serviços e chamadas de API
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