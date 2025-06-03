---
title: Get Started
---
# Quick Start Guide

## Overview

This guide provides a quick start to the FoodHouse application. It covers installation, configuration, and basic usage.

## Prerequisites

1. **Required Tools**
   ```bash
   # Check Go version
   go version  # Should be 1.20 or higher

   # Check Node.js version
   node --version  # Should be 18 or higher

   # Check Docker version
   docker --version  # Should be 20.10 or higher

   # Check Docker Compose version
   docker-compose --version  # Should be 2.0 or higher

   # Check Kubernetes version
   kubectl version  # Should be 1.20 or higher
   ```

2. **Required Accounts**
   - GitHub account
   - Docker Hub account
   - AWS account (for production deployment)

## Installation

1. **Clone Repository**
   ```bash
   # Clone repository
   git clone https://github.com/foodhouse/foodhouse.git
   cd foodhouse
   ```

2. **Install Dependencies**
   ```bash
   # Install Go dependencies
   go mod download

   # Install Node.js dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Generate Protocol Buffers**
   ```bash
   # Install Protocol Buffers compiler
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

   # Generate Protocol Buffers
   protoc --go_out=. --go_opt=paths=source_relative \
       --go-grpc_out=. --go-grpc_opt=paths=source_relative \
       proto/*.proto
   ```

## Configuration

1. **Environment Variables**
   ```bash
   # Copy environment file
   cp .env.example .env

   # Edit environment file
   vim .env
   ```

2. **Database Setup**
   ```bash
   # Start PostgreSQL
   docker-compose up -d postgres

   # Run migrations
   go run cmd/migrate/main.go up
   ```

3. **Cache Setup**
   ```bash
   # Start Redis
   docker-compose up -d redis
   ```

4. **Message Queue Setup**
   ```bash
   # Start RabbitMQ
   docker-compose up -d rabbitmq
   ```

## Running the Application

1. **Development Mode**
   ```bash
   # Start all services
   docker-compose up -d

   # Start application
   go run cmd/api/main.go
   ```

2. **Production Mode**
   ```bash
   # Build application
   docker-compose build

   # Start application
   docker-compose up -d
   ```

3. **Kubernetes Deployment**
   ```bash
   # Apply Kubernetes manifests
   kubectl apply -f k8s/

   # Check deployment status
   kubectl get pods
   ```

## Basic Usage

1. **User Management**
   ```bash
   # Create user
   curl -X POST http://localhost:8080/api/v1/users \
       -H "Content-Type: application/json" \
       -d '{
           "email": "user@example.com",
           "password": "password123",
           "first_name": "John",
           "last_name": "Doe"
       }'

   # Login
   curl -X POST http://localhost:8080/api/v1/auth/login \
       -H "Content-Type: application/json" \
       -d '{
           "email": "user@example.com",
           "password": "password123"
       }'
   ```

2. **Product Management**
   ```bash
   # Create product
   curl -X POST http://localhost:8080/api/v1/products \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer <token>" \
       -d '{
           "name": "Organic Apples",
           "description": "Fresh organic apples",
           "price": 2.99,
           "category_id": "1"
       }'

   # List products
   curl -X GET http://localhost:8080/api/v1/products \
       -H "Authorization: Bearer <token>"
   ```

3. **Order Management**
   ```bash
   # Create order
   curl -X POST http://localhost:8080/api/v1/orders \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer <token>" \
       -d '{
           "items": [
               {
                   "product_id": "1",
                   "quantity": 2
               }
           ],
           "shipping_address_id": "1"
       }'

   # List orders
   curl -X GET http://localhost:8080/api/v1/orders \
       -H "Authorization: Bearer <token>"
   ```

4. **Payment Processing**
   ```bash
   # Initiate payment
   curl -X POST http://localhost:8080/api/v1/payments \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer <token>" \
       -d '{
           "order_id": "1",
           "payment_method": "credit_card",
           "amount": 5.98
       }'

   # Confirm payment
   curl -X POST http://localhost:8080/api/v1/payments/1/confirm \
       -H "Authorization: Bearer <token>"
   ```

## Development Workflow

1. **Code Style**
   ```bash
   # Format Go code
   go fmt ./...

   # Format frontend code
   cd frontend
   npm run format
   cd ..
   ```

2. **Testing**
   ```bash
   # Run Go tests
   go test ./...

   # Run frontend tests
   cd frontend
   npm test
   cd ..
   ```

3. **Building**
   ```bash
   # Build Go application
   go build -o bin/api cmd/api/main.go

   # Build frontend
   cd frontend
   npm run build
   cd ..
   ```

4. **Docker Build**
   ```bash
   # Build Docker image
   docker build -t foodhouse:latest .
   ```

## Monitoring

1. **Application Metrics**
   ```bash
   # Check metrics
   curl http://localhost:9090/metrics
   ```

2. **Health Check**
   ```bash
   # Check health
   curl http://localhost:8080/health
   ```

3. **Logs**
   ```bash
   # Check application logs
   docker-compose logs -f api

   # Check database logs
   docker-compose logs -f postgres

   # Check cache logs
   docker-compose logs -f redis

   # Check message queue logs
   docker-compose logs -f rabbitmq
   ```

## Troubleshooting

1. **Common Issues**
   ```bash
   # Check service status
   docker-compose ps

   # Check service logs
   docker-compose logs

   # Check service configuration
   docker-compose config
   ```

2. **Database Issues**
   ```bash
   # Check database connection
   docker-compose exec postgres psql -U postgres -d foodhouse

   # Check database logs
   docker-compose logs postgres
   ```

3. **Cache Issues**
   ```bash
   # Check Redis connection
   docker-compose exec redis redis-cli ping

   # Check Redis logs
   docker-compose logs redis
   ```

4. **Message Queue Issues**
   ```bash
   # Check RabbitMQ connection
   docker-compose exec rabbitmq rabbitmqctl status

   # Check RabbitMQ logs
   docker-compose logs rabbitmq
   ```

## Next Steps

1. **Documentation**
   - Read the [Architecture Guide](architecture.md)
   - Read the [API Documentation](api-documentation.md)
   - Read the [Database Schema](database-schema.md)
   - Read the [Deployment Guide](deployment.md)

2. **Development**
   - Set up your development environment
   - Create a new feature branch
   - Write tests for your changes
   - Submit a pull request

3. **Deployment**
   - Set up your production environment
   - Configure monitoring and alerts
   - Deploy the application
   - Monitor the deployment

4. **Contributing**
   - Read the [Contributing Guide](contributing.md)
   - Follow the code style guide
   - Write documentation
   - Submit issues and pull requests 