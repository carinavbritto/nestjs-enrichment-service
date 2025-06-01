# Enrichment Service

Serviço de enriquecimento de perfis de usuário que consome eventos de criação de usuário e adiciona dados sociais fictícios.

## Funcionalidades

- Consome eventos `user.created` do RabbitMQ
- Gera dados sociais fictícios (LinkedIn e GitHub)
- Persiste dados enriquecidos no MongoDB
- Expõe endpoint REST para consulta de dados enriquecidos

## Estratégia de Tratamento de Erros

O serviço implementa as seguintes estratégias para tratamento de erros:

1. **Retry Automático**: O RabbitMQ tenta reprocessar mensagens que falharam automaticamente
2. **Dead Letter Queue**: Mensagens que falham após todas as tentativas são enviadas para uma fila de mensagens mortas
3. **Logging**: Todos os erros são registrados com stack trace para facilitar o debug

## Requisitos

- Node.js 20+
- Docker e Docker Compose
- MongoDB Atlas (ou MongoDB local)
- RabbitMQ

## Configuração

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```env
# MongoDB
MONGODB_URI=sua_uri_do_mongodb

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5673

# Application
PORT=3000
NODE_ENV=development
```

## Execução

### Usando Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f app
```

### Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Iniciar RabbitMQ
docker-compose up rabbitmq -d

# Iniciar aplicação
pnpm run start
```

## Endpoints

### GET /users/enriched/:uuid

Retorna os dados sociais enriquecidos de um usuário.

**Exemplo de Resposta:**

```json
{
  "linkedin": "https://linkedin.com/in/nome-usuario",
  "github": "https://github.com/nome-usuario"
}
```

**Códigos de Resposta:**

- 200: Dados encontrados
- 404: Usuário não encontrado

## Estrutura do Projeto

```
src/
  ├── users/
  │   ├── controllers/
  │   ├── services/
  │   ├── repositories/
  │   ├── schemas/
  │   └── consumers/
  ├── app.module.ts
  └── main.ts
```

## Tecnologias Utilizadas

- NestJS
- MongoDB
- RabbitMQ
- Docker
- TypeScript
