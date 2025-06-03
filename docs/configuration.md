# Configuration Guide

## Overview

This guide provides comprehensive information about configuring the FoodHouse application. It covers environment variables, configuration files, and deployment configurations.

## Environment Variables

### Core Configuration

1. **Application Settings**
   ```bash
   # Application settings
   APP_NAME=FoodHouse
   APP_ENV=development
   APP_DEBUG=true
   APP_URL=http://localhost:8080
   APP_PORT=8080
   ```

2. **Database Settings**
   ```bash
   # Database settings
   DB_CONNECTION=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=foodhouse
   DB_USERNAME=postgres
   DB_PASSWORD=secret
   ```

3. **Cache Settings**
   ```bash
   # Cache settings
   CACHE_DRIVER=redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=null
   REDIS_DB=0
   ```

4. **Message Queue Settings**
   ```bash
   # Message queue settings
   QUEUE_CONNECTION=rabbitmq
   RABBITMQ_HOST=localhost
   RABBITMQ_PORT=5672
   RABBITMQ_USER=guest
   RABBITMQ_PASSWORD=guest
   ```

### Service Configuration

1. **User Service**
   ```bash
   # User service settings
   USER_SERVICE_PORT=8081
   USER_SERVICE_HOST=localhost
   USER_SERVICE_GRPC_PORT=50051
   ```

2. **Product Service**
   ```bash
   # Product service settings
   PRODUCT_SERVICE_PORT=8082
   PRODUCT_SERVICE_HOST=localhost
   PRODUCT_SERVICE_GRPC_PORT=50052
   ```

3. **Order Service**
   ```bash
   # Order service settings
   ORDER_SERVICE_PORT=8083
   ORDER_SERVICE_HOST=localhost
   ORDER_SERVICE_GRPC_PORT=50053
   ```

4. **Payment Service**
   ```bash
   # Payment service settings
   PAYMENT_SERVICE_PORT=8084
   PAYMENT_SERVICE_HOST=localhost
   PAYMENT_SERVICE_GRPC_PORT=50054
   ```

### Security Configuration

1. **JWT Settings**
   ```bash
   # JWT settings
   JWT_SECRET=your-secret-key
   JWT_EXPIRY=24h
   JWT_REFRESH_EXPIRY=168h
   ```

2. **OAuth2 Settings**
   ```bash
   # OAuth2 settings
   OAUTH2_CLIENT_ID=your-client-id
   OAUTH2_CLIENT_SECRET=your-client-secret
   OAUTH2_REDIRECT_URL=http://localhost:8080/oauth/callback
   ```

3. **Rate Limiting**
   ```bash
   # Rate limiting settings
   RATE_LIMIT_REQUESTS=100
   RATE_LIMIT_WINDOW=1m
   ```

### Monitoring Configuration

1. **Prometheus Settings**
   ```bash
   # Prometheus settings
   PROMETHEUS_ENABLED=true
   PROMETHEUS_PORT=9090
   PROMETHEUS_PATH=/metrics
   ```

2. **Grafana Settings**
   ```bash
   # Grafana settings
   GRAFANA_ENABLED=true
   GRAFANA_PORT=3000
   GRAFANA_ADMIN_USER=admin
   GRAFANA_ADMIN_PASSWORD=admin
   ```

## Configuration Files

### Application Configuration

1. **config.yaml**
   ```yaml
   # Application configuration
   app:
     name: FoodHouse
     env: development
     debug: true
     url: http://localhost:8080
     port: 8080

   database:
     connection: postgres
     host: localhost
     port: 5432
     database: foodhouse
     username: postgres
     password: secret

   cache:
     driver: redis
     host: localhost
     port: 6379
     password: null
     db: 0

   queue:
     connection: rabbitmq
     host: localhost
     port: 5672
     user: guest
     password: guest
   ```

2. **services.yaml**
   ```yaml
   # Services configuration
   services:
     user:
       port: 8081
       host: localhost
       grpc_port: 50051

     product:
       port: 8082
       host: localhost
       grpc_port: 50052

     order:
       port: 8083
       host: localhost
       grpc_port: 50053

     payment:
       port: 8084
       host: localhost
       grpc_port: 50054
   ```

### Security Configuration

1. **security.yaml**
   ```yaml
   # Security configuration
   security:
     jwt:
       secret: your-secret-key
       expiry: 24h
       refresh_expiry: 168h

     oauth2:
       client_id: your-client-id
       client_secret: your-client-secret
       redirect_url: http://localhost:8080/oauth/callback

     rate_limit:
       requests: 100
       window: 1m
   ```

2. **cors.yaml**
   ```yaml
   # CORS configuration
   cors:
     allowed_origins:
       - http://localhost:3000
       - https://foodhouse.com
     allowed_methods:
       - GET
       - POST
       - PUT
       - DELETE
     allowed_headers:
       - Authorization
       - Content-Type
     exposed_headers:
       - X-Total-Count
     max_age: 3600
   ```

### Monitoring Configuration

1. **prometheus.yaml**
   ```yaml
   # Prometheus configuration
   prometheus:
     enabled: true
     port: 9090
     path: /metrics
     scrape_interval: 15s
     evaluation_interval: 15s

   scrape_configs:
     - job_name: 'users-service'
       static_configs:
         - targets: ['users-service:8080']
     - job_name: 'products-service'
       static_configs:
         - targets: ['products-service:8080']
     - job_name: 'orders-service'
       static_configs:
         - targets: ['orders-service:8080']
     - job_name: 'payments-service'
       static_configs:
         - targets: ['payments-service:8080']
   ```

2. **grafana.yaml**
   ```yaml
   # Grafana configuration
   grafana:
     enabled: true
     port: 3000
     admin_user: admin
     admin_password: admin
     security:
       allow_embedding: true
       cookie_secure: true
       disable_initial_admin_creation: false
     server:
       root_url: http://localhost:3000
       serve_from_sub_path: false
   ```

## Deployment Configuration

### Docker Configuration

1. **Dockerfile**
   ```dockerfile
   # Base image
   FROM golang:1.20-alpine AS builder

   # Set working directory
   WORKDIR /app

   # Copy go mod and sum files
   COPY go.mod go.sum ./

   # Download dependencies
   RUN go mod download

   # Copy source code
   COPY . .

   # Build application
   RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

   # Final image
   FROM alpine:latest

   # Install ca-certificates
   RUN apk --no-cache add ca-certificates

   # Set working directory
   WORKDIR /root/

   # Copy binary from builder
   COPY --from=builder /app/main .

   # Expose port
   EXPOSE 8080

   # Run application
   CMD ["./main"]
   ```

2. **docker-compose.yaml**
   ```yaml
   # Docker Compose configuration
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "8080:8080"
       environment:
         - APP_ENV=development
         - DB_HOST=postgres
         - REDIS_HOST=redis
         - RABBITMQ_HOST=rabbitmq
       depends_on:
         - postgres
         - redis
         - rabbitmq

     postgres:
       image: postgres:13
       environment:
         - POSTGRES_DB=foodhouse
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=secret
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

     redis:
       image: redis:6
       ports:
         - "6379:6379"
       volumes:
         - redis_data:/data

     rabbitmq:
       image: rabbitmq:3-management
       ports:
         - "5672:5672"
         - "15672:15672"
       volumes:
         - rabbitmq_data:/var/lib/rabbitmq

   volumes:
     postgres_data:
     redis_data:
     rabbitmq_data:
   ```

### Kubernetes Configuration

1. **deployment.yaml**
   ```yaml
   # Kubernetes deployment configuration
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: foodhouse
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: foodhouse
     template:
       metadata:
         labels:
           app: foodhouse
       spec:
         containers:
         - name: foodhouse
           image: foodhouse:latest
           ports:
           - containerPort: 8080
           env:
           - name: APP_ENV
             value: production
           - name: DB_HOST
             value: postgres
           - name: REDIS_HOST
             value: redis
           - name: RABBITMQ_HOST
             value: rabbitmq
           resources:
             requests:
               cpu: "500m"
               memory: "512Mi"
             limits:
               cpu: "1000m"
               memory: "1Gi"
   ```

2. **service.yaml**
   ```yaml
   # Kubernetes service configuration
   apiVersion: v1
   kind: Service
   metadata:
     name: foodhouse
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
     selector:
       app: foodhouse
   ```

### AWS Configuration

1. **terraform/main.tf**
   ```hcl
   # AWS infrastructure configuration
   provider "aws" {
     region = "us-west-2"
   }

   # VPC
   resource "aws_vpc" "main" {
     cidr_block = "10.0.0.0/16"
   }

   # ECS Cluster
   resource "aws_ecs_cluster" "main" {
     name = "foodhouse"
   }

   # RDS
   resource "aws_db_instance" "main" {
     engine         = "postgres"
     instance_class = "db.t3.micro"
     name           = "foodhouse"
     username       = "postgres"
     password       = "secret"
   }

   # ElastiCache
   resource "aws_elasticache_cluster" "main" {
     engine         = "redis"
     node_type      = "cache.t3.micro"
     num_cache_nodes = 1
   }
   ```

2. **terraform/variables.tf**
   ```hcl
   # AWS variables
   variable "aws_region" {
     description = "AWS region"
     type        = string
     default     = "us-west-2"
   }

   variable "environment" {
     description = "Environment name"
     type        = string
     default     = "production"
   }

   variable "db_instance_class" {
     description = "RDS instance class"
     type        = string
     default     = "db.t3.micro"
   }

   variable "cache_node_type" {
     description = "ElastiCache node type"
     type        = string
     default     = "cache.t3.micro"
   }
   ```

## Configuration Management

### Environment-Specific Configuration

1. **Development**
   ```yaml
   # Development configuration
   app:
     env: development
     debug: true
     url: http://localhost:8080

   database:
     host: localhost
     port: 5432

   cache:
     host: localhost
     port: 6379

   queue:
     host: localhost
     port: 5672
   ```

2. **Staging**
   ```yaml
   # Staging configuration
   app:
     env: staging
     debug: false
     url: https://staging.foodhouse.com

   database:
     host: staging-db.foodhouse.com
     port: 5432

   cache:
     host: staging-cache.foodhouse.com
     port: 6379

   queue:
     host: staging-queue.foodhouse.com
     port: 5672
   ```

3. **Production**
   ```yaml
   # Production configuration
   app:
     env: production
     debug: false
     url: https://foodhouse.com

   database:
     host: prod-db.foodhouse.com
     port: 5432

   cache:
     host: prod-cache.foodhouse.com
     port: 6379

   queue:
     host: prod-queue.foodhouse.com
     port: 5672
   ```

### Configuration Validation

1. **Schema Validation**
   ```go
   // Configuration schema
   type Config struct {
       App struct {
           Name  string `yaml:"name" validate:"required"`
           Env   string `yaml:"env" validate:"required,oneof=development staging production"`
           Debug bool   `yaml:"debug"`
           URL   string `yaml:"url" validate:"required,url"`
           Port  int    `yaml:"port" validate:"required,min=1,max=65535"`
       } `yaml:"app"`

       Database struct {
           Connection string `yaml:"connection" validate:"required"`
           Host       string `yaml:"host" validate:"required"`
           Port       int    `yaml:"port" validate:"required,min=1,max=65535"`
           Database   string `yaml:"database" validate:"required"`
           Username   string `yaml:"username" validate:"required"`
           Password   string `yaml:"password" validate:"required"`
       } `yaml:"database"`
   }
   ```

2. **Validation Function**
   ```go
   // Validate configuration
   func ValidateConfig(config *Config) error {
       validate := validator.New()
       if err := validate.Struct(config); err != nil {
           return fmt.Errorf("invalid configuration: %v", err)
       }
       return nil
   }
   ```

### Configuration Loading

1. **Load Configuration**
   ```go
   // Load configuration
   func LoadConfig(path string) (*Config, error) {
       // Read file
       data, err := ioutil.ReadFile(path)
       if err != nil {
           return nil, fmt.Errorf("error reading config file: %v", err)
       }

       // Parse YAML
       var config Config
       if err := yaml.Unmarshal(data, &config); err != nil {
           return nil, fmt.Errorf("error parsing config file: %v", err)
       }

       // Validate configuration
       if err := ValidateConfig(&config); err != nil {
           return nil, err
       }

       return &config, nil
   }
   ```

2. **Environment Overrides**
   ```go
   // Override configuration with environment variables
   func OverrideConfig(config *Config) {
       if env := os.Getenv("APP_ENV"); env != "" {
           config.App.Env = env
       }
       if debug := os.Getenv("APP_DEBUG"); debug != "" {
           config.App.Debug = debug == "true"
       }
       if url := os.Getenv("APP_URL"); url != "" {
           config.App.URL = url
       }
       if port := os.Getenv("APP_PORT"); port != "" {
           if p, err := strconv.Atoi(port); err == nil {
               config.App.Port = p
           }
       }
   }
   ```

## Configuration Best Practices

### Security

1. **Secret Management**
   - Use environment variables for secrets
   - Use a secret management service
   - Encrypt sensitive configuration
   - Rotate secrets regularly

2. **Access Control**
   - Restrict configuration file access
   - Use least privilege principle
   - Audit configuration changes
   - Monitor configuration access

### Performance

1. **Caching**
   - Cache configuration values
   - Use appropriate cache TTL
   - Implement cache invalidation
   - Monitor cache performance

2. **Optimization**
   - Minimize configuration size
   - Use efficient serialization
   - Implement lazy loading
   - Profile configuration loading

### Maintenance

1. **Version Control**
   - Track configuration changes
   - Use configuration templates
   - Document configuration changes
   - Review configuration changes

2. **Monitoring**
   - Monitor configuration loading
   - Track configuration errors
   - Alert on configuration issues
   - Log configuration changes

### Documentation

1. **Configuration Documentation**
   - Document all configuration options
   - Provide examples
   - Explain dependencies
   - Include validation rules

2. **Change Management**
   - Document configuration changes
   - Track configuration versions
   - Plan configuration updates
   - Test configuration changes 