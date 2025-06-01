# NestJS Enrichment Service

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Descrição

Serviço de enriquecimento de perfis de usuários que escuta eventos de criação de usuários em uma fila RabbitMQ, gera dados sociais simulados e os persiste em um banco de dados MongoDB.

## Funcionalidades

- Consome eventos `user.created` do RabbitMQ
- Gera dados sociais simulados (LinkedIn e GitHub)
- Persiste dados enriquecidos no MongoDB
- Expõe endpoint para consulta de dados enriquecidos

## Requisitos

- Node.js 20+
- Docker e Docker Compose
- MongoDB
- RabbitMQ

## Configuração

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário
3. Instale as dependências:
   ```bash
   pnpm install
   ```

## Executando com Docker

```bash
docker-compose up -d
```

## Executando localmente

1. Inicie o MongoDB e RabbitMQ:

   ```bash
   docker-compose up -d mongodb rabbitmq
   ```

2. Execute a aplicação:
   ```bash
   pnpm start:dev
   ```

## Endpoints

### GET /users/enriched/:uuid

Retorna os dados enriquecidos de um usuário.

Exemplo de resposta:

```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "linkedin": "linkedin.com/in/john-doe",
  "github": "github.com/john-doe"
}
```

## Eventos RabbitMQ

### user.created

Evento que dispara o enriquecimento do perfil.

Exemplo de payload:

```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe"
}
```

## Desenvolvimento

- `pnpm start:dev`: Inicia o servidor em modo desenvolvimento
- `pnpm build`: Compila o projeto
- `pnpm start:prod`: Inicia o servidor em modo produção
- `pnpm test`: Executa os testes
- `pnpm lint`: Executa o linter
