# Order Service 

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/luizalbano/order-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue)](https://nodejs.org/)
[![API Documentation](https://img.shields.io/badge/docs-API-blue)](docs/api.md)

## Sobre o Projeto

Microsserviço responsável pelo gerenciamento de pedidos em um sistema de e-commerce. Gerencia todo o ciclo de vida dos pedidos desde a criação até a entrega, garantindo consistência e integração com outros serviços do ecossistema.

## Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação [Configuração](#-configuração)
- [Documentação da API](#-documentação-da-api)
- [so](#-uso)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Monitor-monitoramento)
- [Suporte](#-suporte)
- [Licença](#-licença)

## Funcionalidades

-  Criação de pedidos com validação em tempo real
-  Consulta de pedidos por ID ou filtros diversos
-  Atualização de status do com workflow controlado
-  Cálculo automático de totais, impostos e frete ; Integração com serviços de pagamento, estoque e clientes
-  Publicação de eventos para outros miciços
-  Health checks e métricas de monitoramento
-  Logs estruturados para troubleshooting

##  Tecnologias

| Tecnologia         | Versão | Propósito |
| **Node.js**        | 18+    | Runtime JavaScript |
| **Express.js**     | 4.18+  | Framework web |
| **PostgreSQL**     | 14     | Banco de dados relacional |
| **Prisma**         | 5.0+   | ORM e migrações |
| **RabbitMQ**       | 3.12+  | Broker de mensagens |
| **Redis**          | 7.0+   | Cache e sessões |
| **Jest**           | 29.0+  | Framework de testes |
| **Docker**         | 24.0+  | Containerização |
| **Docker Compose** | 2.20+  | Orquestração local |
| **Winston**        | 3.10+  | Logging estruturado |
| **Prometheus**     | 2.47+  | Métricas e monitoramento |

##  Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** 18.0.0 ou superior
- **npm** 9.0.0 ou superior
- **Docker** e **Docker Compose** (para ambiente com containers)
- **Git** para controle de versão

Opcional (para desenvolvimento):
- **PostgreSQL** 14 (ou usar o container Docker)
- **Redis** 7.0+
- **RabbitMQ** 3.12+

## Instalação

### Usando Docker

```bash
# Clone o repositório
git clone https://github.com/luizalbano/order-service.git
cd order-service

# Inicie todos os containers
docker-compose up -d

# Verifique se todos os serviços estão rodando
docker-compose ps

# O serviço estará disponível em http://localhost:3000
```

### Instalação Manual

```bash
# Clone o repositório
git clone https://github.com/luizalbano/order-service.git
cd order-service

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env

# Execute migrações do banco de dados
npm run migrate

# Inicie o serviço
npm run dev

# O serviço estará disponível em http://localhost:3000
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Ambiente
NODE_ENV=development
PORT=3000

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/order_db

# Mensageria
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_EXCHANGE=order_events Cache
REDIS_URL=redis://localhost:6379

# Segurança
JWT_SECRET=your-secret-key-change-in-production
API_KEY=your-api-key

# Serviços Externos
CUSTOMER_SERVICE_URL=http://localhost:3001
INVENTORY_SERVICE_URL=http://localhost:3002
PAYMENT_SERVICE_URL=http://localhost:3003

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Monitoramento
PROMETHEUS_METRICS_PORT=9090
```

### Configuração do Docker Compose

O `docker-compose.yml` já inclui configuração para:
- Order Service (porta 3000)
- PostgreSQL (porta 5432)
- Redis (porta 6379)
- RabbitMQ (porta 5672)
- Prometheus (porta 9090)
- Grafana (porta 3001)

## Documentação da API

### Endpoints Principais

| Método     | Endpoint                     | Descrição                 | Autenticação |
| **POST**   | `/api/v1/orders`             | Cria um novo pedido       | API Key      |
| **GET**    | `/api/v1/orders/{id}`        | Busca pedido por ID       | API Key      |
| **GET**    | `/api/v1/orders`             | Lista pedidos com filtros | API Key      |
| **PATCH**  | `/api/v1/orders/{id}/status` | Atualiza status do pedido | API Key      |
| **DELETE** | `/api/v1/orders/{id}`        | Cancela um pedido         | API Key      |
| **GET**    | `/health`                    | Health check do serviço   | Pública      |
| **GET**    | `/metrics`                   | Métricas Prometheus       | Pública      |

### Documentação Completa

- [Documentação detalhada da API](docs/api.md)
- [Coleção Postman](docs/order-service.postman_collection.json)
- **Swagger UI**: Disponível em `http://localhost:3000/api-docs` quando o serviço está rodando

## Uso

### Criar um Pedido

```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-api-key" \
  -d '{
    "customerId": "123e4567-e89b-12d3-a456-426614174000",
    "items": {
        "productId": "prod_001",
        "quantity": 2,
        "unitPrice": 49.99
      }
    ],
    "shippingAddress": {
      "street": "Rua das Flores, 123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "012567"
    }
  }'
```

### Consultar um Pedido

```bash
curl -X GET http://localhost:3000/api/v1/orders/ord_987654321 \
  -H "X-API-Key: sua-api-key"
```

### Health Check

```bash
curl http://localhost:3000/health
```

### Métricas Prometheus

```bash
curllocalhost:3000/metrics
```

## Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em watch mode
npm run test:watch

# Executar testes de integração
npm run test:integration

# Executar testes end-to-end
npm run test:e2e
```

**Cobertura atual:** 92%  
**Relatório de cobertura:** `coverage/lcov-report/index.html`

## Deploy

### Ambiente de Produção

```bash
# Build da imagem Docker
docker build -t order-service:1.0.0 .

# Executar container
docker run -d \
name order-service \
  -p 3000:3000 \
  --env-file .env.production \
  --rest-stopped \
  order-service:1.0.0
```

### Kubernetes

```bash
# Aplicar configura
kubectl apply -f k8s
