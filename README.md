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

- Escuta eventos `user.created` em uma fila RabbitMQ
- Extrai `uuid` e `name` dos eventos
- Gera dados sociais simulados:
  - LinkedIn: linkedin.com/in/<slug-do-nome>
  - GitHub: github.com/<slug-do-nome>
- Persiste os dados enriquecidos no MongoDB
- Expõe endpoint para consulta dos dados enriquecidos

## Tecnologias

- NestJS
- MongoDB
- RabbitMQ
- Winston (logs)
- Docker

## Configuração do Projeto

```bash
# Instalar dependências
$ pnpm install

# Configurar variáveis de ambiente
$ cp .env.example .env
```

## Executando o Projeto

```bash
# Desenvolvimento
$ pnpm run start

# Modo watch
$ pnpm run start:dev

# Produção
$ pnpm run start:prod
```

## Testes

```bash
# Testes unitários
$ pnpm run test

# Testes e2e
$ pnpm run test:e2e

# Cobertura de testes
$ pnpm run test:cov
```

## Docker

```bash
# Construir e iniciar os containers
$ docker-compose up -d
```

## Licença

Este projeto está licenciado sob a licença MIT.
