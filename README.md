# Configurando Booking.com Clone

Este guia irá lhe guiar no processo de configurar o Booking.com Clone na sua máquina.

### Pré-requisitos

Antes de iniciar, tenha certeza que tem o Node.js instalado.

## Clonando o Repositório

Comece clonando este repositório na sua máquina.

```
git clone https://github.com/guilhermemrnd/mern-booking-app.git
cd mern-booking-app
```

## Configuração do Backend

**1. Variáveis de ambiente:** Navague para a pasta `backend` e crie dois arquivos: `.env` e `.env.e2e`. Adicione o conteúdo abaixo em ambos os arquivos:

```
MONGODB_CONNECTION

JWT_SECRET_KEY
FRONTEND_URL

# Cloudinary Variables
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

# Stripe Variables
STRIPE_API_KEY
```

**2. Configurando MongoDB**:

- Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Crie um novo cluster e siga as instruções para cria um novo banco de dados.
- Feito isso, pegue sua string de conexão com o MongoDB e adicione na variável `MONGODB_CONNECTION` no seus arquivos `.env`.
- Para a configuração do `env.e2e` veja "executando testes automatizados" abaixo.

**3. Configurando Cloudinary**:

- Crie uma conta em [Cloudinary](https://cloudinary.com).
- Navegue para o dashboard para encontrar _cloud name_, API key, e API secret.
- Adicione estas informações às respectivas variáveis nos arquivos `.env`.

**4. Configurando Stripe**:

- Crie uma conta em [Stripe](https://stripe.com/).
- Encontre suas API keys no dashboard.
- Adicione sua Stripe API key em `STRIPE_API_KEY` nos arquivos `.env`.

**5. JWT_SECRET_KEY**:

- Pode ser qualquer string longa e aleatória. Você pode buscar no google por "secret key generator".

**6. Frontend URL**:

- A `FRONTEND_URL` deve apontar para a URL onde seu frontend estará rodando (geralmente `http://localhost:3000` se você está rodando localmente).

## Configuração do Frontend

**1. Variáveis de Ambiente**: Navegue para a pasta `frontend` e crie um arquivo `.env`.

```
VITE_API_BASE_URL=
VITE_STRIPE_PUB_KEY=
```

**2. VITE_API_BASE_URL**:

- A `VITE_API_BASE_URL` deve apontar para a URL onde seu backend estará rodando (geralmente `http://localhost:7000` se estiver rodando localmente).

## Subindo a Aplicação

**1. Backend**:

- Navegue para a pasta `backend`.
- Instale as dependências: `pnpm install`.
- Inicie o servidor: `pnpm start`.

**2. Frontend**:

- Abra um novo terminal e navegue até o diretório `frontend`.
- Instale as depedências: `pnpm install`.
- Inicie a aplicação frontend: `pnpm dev`.

## Execuntado Testes Automatizados

**1. Configuração do MongoDB**:

- Idealmente você deve criar um novo banco dados MongoDB para executar os testes. Isso para que os dados sejam estáveis.
- Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) caso não tenha criado ainda.
- Crie um novo projeto (ex: e2e tests).
- Crie um novo cluster e siga as instruções para criar um novo banco de dados.
- Feito isso, pegue sua string de conexão com o MongoDB e adicione na variável `MONGODB_CONNECTION` no arquivo `env.e2e`.

**2. Importando dados para teste no MongoDB**:

- Este repositório contém uma pasta `data` na raiz, que possue arquivos JSON para um usuário de teste e um hotel de teste.
- **Localize o arquivo de Usuário Teste**: Na pasta `data`, encontre o arquivo que contém o usuário de teste (nomeado como `test-user.json`).
- Acesse o banco de dados para testes que você criou anteriormente.
- **Importe o Usuário Teste**:
  - Navegue até a coleção `users` dentro do banco de dados. (Crie caso não exista ainda)
  - Clique no botão "Inserir Documento", escolha como formato JSON, cole os dados de teste do arquivo `test-user.json` e clique em "Importar".
  - O usuário de teste será adicionado a coleção de `users`.
  - user login: 1@1.com/password123
- **Importe o Hotel Teste**:
  - Navague até a coleção `hotels` dentro do banco de dados. (Crie caso não exista ainda)
  - Repita o mesmo processo que seguiu para importar o usuário teste, mas desta vez use os dados do arquivo `test-hotel.json`.

**3. Rodando os Testes**

- No VS Code instale a extensão [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).
- Navegue até a pasta `e2e-tests`.
- Instale as dependências: `pnpm install`.
- Inicie o backend e o frontend seguindo os passos inicias.
- [Usando extensão Playwright para executar os testes](https://playwright.dev/docs/getting-started-vscode#running-tests).
