# Architecture Guide

## Overview

This guide provides a comprehensive overview of the FoodHouse system architecture. It covers the system design, components, interactions, and deployment architecture.

## System Design

### Architecture Principles

1. **Microservices Architecture**
   - Service independence
   - Domain-driven design
   - Event-driven communication
   - API-first approach

2. **Design Patterns**
   - Repository pattern
   - Factory pattern
   - Observer pattern
   - Circuit breaker pattern

3. **Best Practices**
   - SOLID principles
   - DRY principle
   - KISS principle
   - YAGNI principle

### System Components

1. **Core Services**
   ```
   foodhouse/
   ├── users/              # User management
   ├── products/           # Product management
   ├── orders/             # Order management
   ├── payments/           # Payment processing
   └── delivery/           # Delivery management
   ```

2. **Supporting Services**
   ```
   foodhouse/
   ├── auth/               # Authentication
   ├── notifications/      # Notifications
   ├── analytics/          # Analytics
   └── search/             # Search service
   ```

## Service Architecture

### User Service

1. **Components**
   ```go
   // User service components
   type UserService struct {
       repo    UserRepository
       auth    AuthService
       events  EventPublisher
       cache   Cache
   }

   // User repository interface
   type UserRepository interface {
       Create(ctx context.Context, user *User) error
       GetByID(ctx context.Context, id string) (*User, error)
       Update(ctx context.Context, user *User) error
       Delete(ctx context.Context, id string) error
   }
   ```

2. **API Endpoints**
   ```protobuf
   // User service API
   service UserService {
       rpc CreateUser(CreateUserRequest) returns (User) {
           option (google.api.http) = {
               post: "/v1/users"
               body: "*"
           };
       }
       rpc GetUser(GetUserRequest) returns (User) {
           option (google.api.http) = {
               get: "/v1/users/{id}"
           };
       }
       rpc UpdateUser(UpdateUserRequest) returns (User) {
           option (google.api.http) = {
               put: "/v1/users/{id}"
               body: "*"
           };
       }
       rpc DeleteUser(DeleteUserRequest) returns (Empty) {
           option (google.api.http) = {
               delete: "/v1/users/{id}"
           };
       }
   }
   ```

### Product Service

1. **Components**
   ```go
   // Product service components
   type ProductService struct {
       repo    ProductRepository
       search  SearchService
       events  EventPublisher
       cache   Cache
   }

   // Product repository interface
   type ProductRepository interface {
       Create(ctx context.Context, product *Product) error
       GetByID(ctx context.Context, id string) (*Product, error)
       Update(ctx context.Context, product *Product) error
       Delete(ctx context.Context, id string) error
       List(ctx context.Context, filter ProductFilter) ([]*Product, error)
   }
   ```

2. **API Endpoints**
   ```protobuf
   // Product service API
   service ProductService {
       rpc CreateProduct(CreateProductRequest) returns (Product) {
           option (google.api.http) = {
               post: "/v1/products"
               body: "*"
           };
       }
       rpc GetProduct(GetProductRequest) returns (Product) {
           option (google.api.http) = {
               get: "/v1/products/{id}"
           };
       }
       rpc UpdateProduct(UpdateProductRequest) returns (Product) {
           option (google.api.http) = {
               put: "/v1/products/{id}"
               body: "*"
           };
       }
       rpc DeleteProduct(DeleteProductRequest) returns (Empty) {
           option (google.api.http) = {
               delete: "/v1/products/{id}"
           };
       }
       rpc ListProducts(ListProductsRequest) returns (ListProductsResponse) {
           option (google.api.http) = {
               get: "/v1/products"
           };
       }
   }
   ```

### Order Service

1. **Components**
   ```go
   // Order service components
   type OrderService struct {
       repo    OrderRepository
       events  EventPublisher
       cache   Cache
       payment PaymentService
   }

   // Order repository interface
   type OrderRepository interface {
       Create(ctx context.Context, order *Order) error
       GetByID(ctx context.Context, id string) (*Order, error)
       Update(ctx context.Context, order *Order) error
       Delete(ctx context.Context, id string) error
       List(ctx context.Context, filter OrderFilter) ([]*Order, error)
   }
   ```

2. **API Endpoints**
   ```protobuf
   // Order service API
   service OrderService {
       rpc CreateOrder(CreateOrderRequest) returns (Order) {
           option (google.api.http) = {
               post: "/v1/orders"
               body: "*"
           };
       }
       rpc GetOrder(GetOrderRequest) returns (Order) {
           option (google.api.http) = {
               get: "/v1/orders/{id}"
           };
       }
       rpc UpdateOrder(UpdateOrderRequest) returns (Order) {
           option (google.api.http) = {
               put: "/v1/orders/{id}"
               body: "*"
           };
       }
       rpc DeleteOrder(DeleteOrderRequest) returns (Empty) {
           option (google.api.http) = {
               delete: "/v1/orders/{id}"
           };
       }
       rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse) {
           option (google.api.http) = {
               get: "/v1/orders"
           };
       }
   }
   ```

### Payment Service

1. **Components**
   ```go
   // Payment service components
   type PaymentService struct {
       repo    PaymentRepository
       events  EventPublisher
       cache   Cache
       gateway PaymentGateway
   }

   // Payment repository interface
   type PaymentRepository interface {
       Create(ctx context.Context, payment *Payment) error
       GetByID(ctx context.Context, id string) (*Payment, error)
       Update(ctx context.Context, payment *Payment) error
       Delete(ctx context.Context, id string) error
       List(ctx context.Context, filter PaymentFilter) ([]*Payment, error)
   }
   ```

2. **API Endpoints**
   ```protobuf
   // Payment service API
   service PaymentService {
       rpc CreatePayment(CreatePaymentRequest) returns (Payment) {
           option (google.api.http) = {
               post: "/v1/payments"
               body: "*"
           };
       }
       rpc GetPayment(GetPaymentRequest) returns (Payment) {
           option (google.api.http) = {
               get: "/v1/payments/{id}"
           };
       }
       rpc UpdatePayment(UpdatePaymentRequest) returns (Payment) {
           option (google.api.http) = {
               put: "/v1/payments/{id}"
               body: "*"
           };
       }
       rpc DeletePayment(DeletePaymentRequest) returns (Empty) {
           option (google.api.http) = {
               delete: "/v1/payments/{id}"
           };
       }
       rpc ListPayments(ListPaymentsRequest) returns (ListPaymentsResponse) {
           option (google.api.http) = {
               get: "/v1/payments"
           };
       }
   }
   ```

## Data Architecture

### Database Design

1. **User Schema**
   ```sql
   CREATE TABLE users (
       id UUID PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       first_name VARCHAR(100),
       last_name VARCHAR(100),
       phone VARCHAR(20),
       role VARCHAR(20) NOT NULL,
       status VARCHAR(20) NOT NULL,
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );

   CREATE TABLE user_addresses (
       id UUID PRIMARY KEY,
       user_id UUID NOT NULL REFERENCES users(id),
       address_line1 VARCHAR(255) NOT NULL,
       address_line2 VARCHAR(255),
       city VARCHAR(100) NOT NULL,
       state VARCHAR(100) NOT NULL,
       country VARCHAR(100) NOT NULL,
       postal_code VARCHAR(20) NOT NULL,
       is_default BOOLEAN NOT NULL DEFAULT false,
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );
   ```

2. **Product Schema**
   ```sql
   CREATE TABLE products (
       id UUID PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10,2) NOT NULL,
       category_id UUID NOT NULL REFERENCES categories(id),
       merchant_id UUID NOT NULL REFERENCES users(id),
       status VARCHAR(20) NOT NULL,
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );

   CREATE TABLE categories (
       id UUID PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       description TEXT,
       parent_id UUID REFERENCES categories(id),
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );
   ```

3. **Order Schema**
   ```sql
   CREATE TABLE orders (
       id UUID PRIMARY KEY,
       user_id UUID NOT NULL REFERENCES users(id),
       status VARCHAR(20) NOT NULL,
       total_amount DECIMAL(10,2) NOT NULL,
       shipping_address_id UUID NOT NULL REFERENCES user_addresses(id),
       payment_id UUID REFERENCES payments(id),
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );

   CREATE TABLE order_items (
       id UUID PRIMARY KEY,
       order_id UUID NOT NULL REFERENCES orders(id),
       product_id UUID NOT NULL REFERENCES products(id),
       quantity INTEGER NOT NULL,
       price DECIMAL(10,2) NOT NULL,
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );
   ```

4. **Payment Schema**
   ```sql
   CREATE TABLE payments (
       id UUID PRIMARY KEY,
       order_id UUID NOT NULL REFERENCES orders(id),
       amount DECIMAL(10,2) NOT NULL,
       currency VARCHAR(3) NOT NULL,
       status VARCHAR(20) NOT NULL,
       payment_method VARCHAR(20) NOT NULL,
       transaction_id VARCHAR(255),
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );

   CREATE TABLE payment_transactions (
       id UUID PRIMARY KEY,
       payment_id UUID NOT NULL REFERENCES payments(id),
       type VARCHAR(20) NOT NULL,
       amount DECIMAL(10,2) NOT NULL,
       status VARCHAR(20) NOT NULL,
       created_at TIMESTAMP NOT NULL,
       updated_at TIMESTAMP NOT NULL
   );
   ```

### Caching Strategy

1. **Cache Configuration**
   ```go
   // Cache configuration
   type CacheConfig struct {
       Host     string
       Port     int
       Password string
       DB       int
       PoolSize int
   }

   // Cache client
   type Cache struct {
       client *redis.Client
       config CacheConfig
   }
   ```

2. **Cache Usage**
   ```go
   // Cache operations
   func (c *Cache) Get(ctx context.Context, key string) (string, error) {
       return c.client.Get(ctx, key).Result()
   }

   func (c *Cache) Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
       return c.client.Set(ctx, key, value, expiration).Err()
   }

   func (c *Cache) Delete(ctx context.Context, key string) error {
       return c.client.Del(ctx, key).Err()
   }
   ```

## Communication Architecture

### Service Communication

1. **gRPC Communication**
   ```go
   // gRPC client
   type GRPCClient struct {
       conn   *grpc.ClientConn
       client pb.ServiceClient
   }

   // gRPC server
   type GRPCServer struct {
       server *grpc.Server
       service Service
   }
   ```

2. **Event Communication**
   ```go
   // Event publisher
   type EventPublisher struct {
       producer *kafka.Producer
       topic    string
   }

   // Event subscriber
   type EventSubscriber struct {
       consumer *kafka.Consumer
       topic    string
   }
   ```

### API Gateway

1. **Gateway Configuration**
   ```yaml
   # API Gateway configuration
   routes:
     - path: /api/v1/users
       service: users
       methods: [GET, POST, PUT, DELETE]
     - path: /api/v1/products
       service: products
       methods: [GET, POST, PUT, DELETE]
     - path: /api/v1/orders
       service: orders
       methods: [GET, POST, PUT, DELETE]
     - path: /api/v1/payments
       service: payments
       methods: [GET, POST, PUT, DELETE]
   ```

2. **Gateway Middleware**
   ```go
   // Authentication middleware
   func AuthMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           token := r.Header.Get("Authorization")
           if token == "" {
               http.Error(w, "Unauthorized", http.StatusUnauthorized)
               return
           }
           // Validate token
           next.ServeHTTP(w, r)
       })
   }

   // Rate limiting middleware
   func RateLimitMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           // Check rate limit
           next.ServeHTTP(w, r)
       })
   }
   ```

## Deployment Architecture

### Infrastructure

1. **AWS Infrastructure**
   ```hcl
   # AWS infrastructure
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
   }

   # ElastiCache
   resource "aws_elasticache_cluster" "main" {
     engine         = "redis"
     node_type      = "cache.t3.micro"
     num_cache_nodes = 1
   }
   ```

2. **Kubernetes Configuration**
   ```yaml
   # Kubernetes deployment
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: users-service
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: users-service
     template:
       metadata:
         labels:
           app: users-service
       spec:
         containers:
         - name: users-service
           image: foodhouse/users-service:latest
           ports:
           - containerPort: 8080
   ```

### Monitoring

1. **Prometheus Configuration**
   ```yaml
   # Prometheus configuration
   global:
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

2. **Grafana Dashboards**
   ```json
   {
     "dashboard": {
       "id": null,
       "title": "FoodHouse Services",
       "panels": [
         {
           "title": "Request Rate",
           "type": "graph",
           "datasource": "Prometheus",
           "targets": [
             {
               "expr": "rate(http_requests_total[5m])",
               "legendFormat": "{{service}}"
             }
           ]
         },
         {
           "title": "Error Rate",
           "type": "graph",
           "datasource": "Prometheus",
           "targets": [
             {
               "expr": "rate(http_errors_total[5m])",
               "legendFormat": "{{service}}"
             }
           ]
         }
       ]
     }
   }
   ```

## Security Architecture

### Authentication

1. **JWT Authentication**
   ```go
   // JWT configuration
   type JWTConfig struct {
       SecretKey     string
       ExpiryHours   int
       RefreshHours  int
   }

   // JWT service
   type JWTService struct {
       config JWTConfig
   }

   // Generate token
   func (s *JWTService) GenerateToken(user *User) (string, error) {
       claims := jwt.MapClaims{
           "user_id": user.ID,
           "email":   user.Email,
           "role":    user.Role,
           "exp":     time.Now().Add(time.Hour * time.Duration(s.config.ExpiryHours)).Unix(),
       }
       token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
       return token.SignedString([]byte(s.config.SecretKey))
   }
   ```

2. **OAuth2 Integration**
   ```go
   // OAuth2 configuration
   type OAuth2Config struct {
       ClientID     string
       ClientSecret string
       RedirectURL  string
       Scopes       []string
   }

   // OAuth2 service
   type OAuth2Service struct {
       config OAuth2Config
   }

   // Authenticate with OAuth2
   func (s *OAuth2Service) Authenticate(code string) (*User, error) {
       // Exchange code for token
       // Get user info
       // Create or update user
   }
   ```

### Authorization

1. **Role-Based Access Control**
   ```go
   // Role definitions
   type Role string

   const (
       RoleAdmin    Role = "admin"
       RoleMerchant Role = "merchant"
       RoleCustomer Role = "customer"
   )

   // Permission definitions
   type Permission string

   const (
       PermissionCreateProduct Permission = "create:product"
       PermissionUpdateProduct Permission = "update:product"
       PermissionDeleteProduct Permission = "delete:product"
   )

   // Check permission
   func (s *Service) CheckPermission(user *User, permission Permission) bool {
       // Check user role
       // Check role permissions
   }
   ```

2. **Resource Ownership**
   ```go
   // Resource ownership check
   func (s *Service) CheckOwnership(user *User, resource Resource) bool {
       switch r := resource.(type) {
       case *Product:
           return r.MerchantID == user.ID
       case *Order:
           return r.UserID == user.ID
       default:
           return false
       }
   }
   ```

## Performance Architecture

### Caching

1. **Cache Strategy**
   ```go
   // Cache strategy
   type CacheStrategy struct {
       TTL           time.Duration
       MaxSize       int
       EvictionPolicy string
   }

   // Cache implementation
   type Cache struct {
       strategy CacheStrategy
       store    *redis.Client
   }

   // Get with cache
   func (c *Cache) GetWithCache(ctx context.Context, key string, fn func() (interface{}, error)) (interface{}, error) {
       // Try cache
       // If miss, call function
       // Store in cache
   }
   ```

2. **Cache Invalidation**
   ```go
   // Cache invalidation
   func (c *Cache) Invalidate(ctx context.Context, pattern string) error {
       // Find keys
       // Delete keys
   }

   // Cache update
   func (c *Cache) Update(ctx context.Context, key string, value interface{}) error {
       // Update cache
       // Publish event
   }
   ```

### Load Balancing

1. **Load Balancer Configuration**
   ```yaml
   # Load balancer configuration
   apiVersion: v1
   kind: Service
   metadata:
     name: users-service
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
     selector:
       app: users-service
   ```

2. **Service Discovery**
   ```go
   // Service discovery
   type ServiceDiscovery struct {
       client *consul.Client
   }

   // Register service
   func (s *ServiceDiscovery) Register(service *Service) error {
       // Register with Consul
   }

   // Discover service
   func (s *ServiceDiscovery) Discover(name string) ([]*Service, error) {
       // Discover from Consul
   }
   ```

## Scalability Architecture

### Horizontal Scaling

1. **Auto Scaling**
   ```yaml
   # Auto scaling configuration
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: users-service
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: users-service
     minReplicas: 3
     maxReplicas: 10
     metrics:
     - type: Resource
       resource:
         name: cpu
         target:
           type: Utilization
           averageUtilization: 70
   ```

2. **Database Scaling**
   ```yaml
   # Database scaling configuration
   apiVersion: v1
   kind: Service
   metadata:
     name: postgres-primary
   spec:
     type: ClusterIP
     ports:
     - port: 5432
     selector:
       app: postgres
       role: primary
   ```

### Vertical Scaling

1. **Resource Limits**
   ```yaml
   # Resource limits
   resources:
     requests:
       cpu: "500m"
       memory: "512Mi"
     limits:
       cpu: "1000m"
       memory: "1Gi"
   ```

2. **Database Resources**
   ```yaml
   # Database resources
   resources:
     requests:
       cpu: "1000m"
       memory: "2Gi"
     limits:
       cpu: "2000m"
       memory: "4Gi"
   ```

## Disaster Recovery

### Backup Strategy

1. **Database Backup**
   ```bash
   # Database backup script
   #!/bin/bash
   BACKUP_DIR="/backups"
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > "$BACKUP_DIR/backup_$TIMESTAMP.sql"
   ```

2. **File Backup**
   ```bash
   # File backup script
   #!/bin/bash
   BACKUP_DIR="/backups"
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   tar -czf "$BACKUP_DIR/files_$TIMESTAMP.tar.gz" /data
   ```

### Recovery Strategy

1. **Database Recovery**
   ```bash
   # Database recovery script
   #!/bin/bash
   BACKUP_FILE=$1
   psql -h $DB_HOST -U $DB_USER -d $DB_NAME < "$BACKUP_FILE"
   ```

2. **Service Recovery**
   ```bash
   # Service recovery script
   #!/bin/bash
   kubectl rollout restart deployment/users-service
   kubectl rollout restart deployment/products-service
   kubectl rollout restart deployment/orders-service
   kubectl rollout restart deployment/payments-service
   ```

## Future Architecture

### Planned Improvements

1. **Service Mesh**
   - Istio integration
   - Traffic management
   - Security policies
   - Observability

2. **Event Sourcing**
   - Event store
   - CQRS pattern
   - Event replay
   - Event versioning

3. **Machine Learning**
   - Recommendation engine
   - Fraud detection
   - Price optimization
   - Demand forecasting

### Architecture Evolution

1. **Phase 1: Foundation**
   - Microservices architecture
   - Basic monitoring
   - Simple scaling

2. **Phase 2: Enhancement**
   - Service mesh
   - Advanced monitoring
   - Auto scaling

3. **Phase 3: Innovation**
   - Event sourcing
   - Machine learning
   - Real-time analytics 