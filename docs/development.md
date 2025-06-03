# Development Guide

## Overview

This guide provides comprehensive instructions for developers working on the FoodHouse application. It covers the development environment setup, coding standards, testing procedures, and best practices.

## Development Environment Setup

### Prerequisites

- Go 1.20+
- Node.js 18+
- Docker 20.10+
- PostgreSQL 13+
- Redis 6+
- gRPC tools
- Protocol Buffers compiler

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/foodhouse/foodhouseapp.git
   cd foodhouseapp
   ```

2. **Install Dependencies**
   ```bash
   # Install Go dependencies
   go mod download

   # Install Node.js dependencies
   npm install
   ```

3. **Setup Development Database**
   ```bash
   # Start PostgreSQL
   docker run -d \
     --name foodhouse-postgres \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=secret \
     -e POSTGRES_DB=foodhouse \
     -p 5432:5432 \
     postgres:13

   # Start Redis
   docker run -d \
     --name foodhouse-redis \
     -p 6379:6379 \
     redis:6
   ```

4. **Generate Protocol Buffers**
   ```bash
   make proto
   ```

## Project Structure

```
foodhouseapp/
├── users/                 # User management service
│   ├── cmd/              # Service entry points
│   ├── internal/         # Internal packages
│   │   ├── api/         # API handlers
│   │   ├── models/      # Data models
│   │   └── repository/  # Database layer
│   └── pkg/             # Public packages
├── products/             # Product management service
├── orders/              # Order management service
├── payments/            # Payment processing service
├── protobuf/            # Protocol Buffer definitions
└── docs/                # Documentation
```

## Coding Standards

### Go Code Style

1. **Formatting**
   ```bash
   # Format code
   go fmt ./...

   # Run linter
   golangci-lint run
   ```

2. **Naming Conventions**
   - Use camelCase for variable names
   - Use PascalCase for exported types and functions
   - Use snake_case for file names
   - Prefix interfaces with 'I' (e.g., IUserRepository)

3. **Error Handling**
   ```go
   // Good
   if err != nil {
       return fmt.Errorf("failed to create user: %w", err)
   }

   // Bad
   if err != nil {
       return err
   }
   ```

4. **Documentation**
   ```go
   // User represents a user in the system
   type User struct {
       ID        string    `json:"id"`
       Email     string    `json:"email"`
       CreatedAt time.Time `json:"created_at"`
   }

   // CreateUser creates a new user
   func (s *Service) CreateUser(ctx context.Context, user *User) error {
       // Implementation
   }
   ```

### Testing Standards

1. **Unit Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       tests := []struct {
           name    string
           user    *User
           wantErr bool
       }{
           {
               name: "valid user",
               user: &User{
                   Email: "test@example.com",
               },
               wantErr: false,
           },
           {
               name: "invalid email",
               user: &User{
                   Email: "invalid-email",
               },
               wantErr: true,
           },
       }

       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // Test implementation
           })
       }
   }
   ```

2. **Integration Tests**
   ```go
   func TestUserService_Integration(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping integration test")
       }

       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       // Run tests
   }
   ```

3. **Mocking**
   ```go
   // mock_user_repository.go
   type MockUserRepository struct {
       mock.Mock
   }

   func (m *MockUserRepository) Create(ctx context.Context, user *User) error {
       args := m.Called(ctx, user)
       return args.Error(0)
   }
   ```

## API Development

### gRPC Service Implementation

1. **Service Definition**
   ```protobuf
   service UserService {
       rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
       rpc GetUser(GetUserRequest) returns (GetUserResponse);
   }
   ```

2. **Service Implementation**
   ```go
   type userService struct {
       pb.UnimplementedUserServiceServer
       repo IUserRepository
   }

   func (s *userService) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
       user := &User{
           Email: req.Email,
       }

       if err := s.repo.Create(ctx, user); err != nil {
           return nil, status.Error(codes.Internal, "failed to create user")
       }

       return &pb.CreateUserResponse{
           User: convertToProtoUser(user),
       }, nil
   }
   ```

### REST API Implementation

1. **Handler Definition**
   ```go
   type UserHandler struct {
       service IUserService
   }

   func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
       var req CreateUserRequest
       if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
           http.Error(w, "invalid request", http.StatusBadRequest)
           return
       }

       user, err := h.service.CreateUser(r.Context(), &req)
       if err != nil {
           http.Error(w, err.Error(), http.StatusInternalServerError)
           return
       }

       json.NewEncoder(w).Encode(user)
   }
   ```

## Database Development

### Schema Migrations

1. **Migration File Structure**
   ```sql
   -- migrations/001_create_users_table.sql
   CREATE TABLE users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email VARCHAR(255) NOT NULL UNIQUE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   -- migrations/002_add_user_roles.sql
   ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user';
   ```

2. **Migration Management**
   ```bash
   # Create new migration
   migrate create -ext sql -dir migrations -seq add_user_roles

   # Run migrations
   migrate -path migrations -database "postgres://postgres:secret@localhost:5432/foodhouse?sslmode=disable" up
   ```

### Repository Pattern

1. **Interface Definition**
   ```go
   type IUserRepository interface {
       Create(ctx context.Context, user *User) error
       GetByID(ctx context.Context, id string) (*User, error)
       Update(ctx context.Context, user *User) error
       Delete(ctx context.Context, id string) error
   }
   ```

2. **Implementation**
   ```go
   type UserRepository struct {
       db *sql.DB
   }

   func (r *UserRepository) Create(ctx context.Context, user *User) error {
       query := `
           INSERT INTO users (email, role)
           VALUES ($1, $2)
           RETURNING id, created_at, updated_at
       `
       return r.db.QueryRowContext(ctx, query, user.Email, user.Role).Scan(
           &user.ID,
           &user.CreatedAt,
           &user.UpdatedAt,
       )
   }
   ```

## Frontend Development

### Component Structure

1. **Vue Component**
   ```vue
   <template>
     <div class="user-form">
       <form @submit.prevent="handleSubmit">
         <div class="form-group">
           <label for="email">Email</label>
           <input
             id="email"
             v-model="email"
             type="email"
             required
           >
         </div>
         <button type="submit">Create User</button>
       </form>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         email: ''
       }
     },
     methods: {
       async handleSubmit() {
         try {
           await this.$api.users.create({ email: this.email })
           this.$router.push('/users')
         } catch (error) {
           this.$notify.error('Failed to create user')
         }
       }
     }
   }
   </script>

   <style scoped>
   .user-form {
     max-width: 400px;
     margin: 0 auto;
   }
   </style>
   ```

2. **API Integration**
   ```javascript
   // api/users.js
   export const users = {
     async create(data) {
       const response = await fetch('/api/users', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
       })
       if (!response.ok) {
         throw new Error('Failed to create user')
       }
       return response.json()
     }
   }
   ```

## Testing

### Unit Testing

1. **Go Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       mockRepo := new(MockUserRepository)
       service := NewUserService(mockRepo)

       user := &User{Email: "test@example.com"}
       mockRepo.On("Create", mock.Anything, user).Return(nil)

       err := service.CreateUser(context.Background(), user)
       assert.NoError(t, err)
       mockRepo.AssertExpectations(t)
   }
   ```

2. **Vue Component Tests**
   ```javascript
   import { mount } from '@vue/test-utils'
   import UserForm from './UserForm.vue'

   describe('UserForm', () => {
     it('submits form data correctly', async () => {
       const wrapper = mount(UserForm)
       const email = 'test@example.com'

       await wrapper.find('input[type="email"]').setValue(email)
       await wrapper.find('form').trigger('submit')

       expect(wrapper.emitted('submit')[0][0]).toEqual({ email })
     })
   })
   ```

### Integration Testing

1. **API Tests**
   ```go
   func TestUserAPI_CreateUser(t *testing.T) {
       server := setupTestServer(t)
       defer server.Close()

       resp, err := http.Post(
           server.URL+"/api/users",
           "application/json",
           strings.NewReader(`{"email":"test@example.com"}`),
       )
       assert.NoError(t, err)
       assert.Equal(t, http.StatusCreated, resp.StatusCode)

       var user User
       err = json.NewDecoder(resp.Body).Decode(&user)
       assert.NoError(t, err)
       assert.Equal(t, "test@example.com", user.Email)
   }
   ```

2. **End-to-End Tests**
   ```javascript
   describe('User Creation', () => {
     it('creates a new user successfully', async () => {
       await page.goto('http://localhost:3000/users/new')
       await page.fill('input[type="email"]', 'test@example.com')
       await page.click('button[type="submit"]')
       await page.waitForNavigation()
       expect(page.url()).toBe('http://localhost:3000/users')
     })
   })
   ```

## Performance Optimization

### Database Optimization

1. **Indexing**
   ```sql
   -- Add indexes for frequently queried columns
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_users_created_at ON users(created_at);
   ```

2. **Query Optimization**
   ```go
   // Use prepared statements
   stmt, err := db.PrepareContext(ctx, `
       SELECT id, email, created_at
       FROM users
       WHERE email = $1
   `)
   if err != nil {
       return nil, err
   }
   defer stmt.Close()
   ```

### Caching

1. **Redis Caching**
   ```go
   func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
       // Try to get from cache
       if user, err := s.cache.Get(ctx, "user:"+id); err == nil {
           return user, nil
       }

       // Get from database
       user, err := s.repo.GetByID(ctx, id)
       if err != nil {
           return nil, err
       }

       // Cache the result
       s.cache.Set(ctx, "user:"+id, user, time.Hour)
       return user, nil
   }
   ```

2. **Frontend Caching**
   ```javascript
   // Cache API responses
   const cache = new Map()

   export const users = {
     async get(id) {
       const key = `user:${id}`
       if (cache.has(key)) {
         return cache.get(key)
       }
       const response = await fetch(`/api/users/${id}`)
       const user = await response.json()
       cache.set(key, user)
       return user
     }
   }
   ```

## Security Best Practices

### Authentication

1. **JWT Implementation**
   ```go
   func (s *UserService) GenerateToken(user *User) (string, error) {
       claims := jwt.MapClaims{
           "sub": user.ID,
           "email": user.Email,
           "exp": time.Now().Add(time.Hour * 24).Unix(),
       }
       token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
       return token.SignedString([]byte(s.jwtSecret))
   }
   ```

2. **Middleware**
   ```go
   func AuthMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           token := r.Header.Get("Authorization")
           if token == "" {
               http.Error(w, "unauthorized", http.StatusUnauthorized)
               return
           }

           // Validate token
           claims, err := validateToken(token)
           if err != nil {
               http.Error(w, "invalid token", http.StatusUnauthorized)
               return
           }

           // Add claims to context
           ctx := context.WithValue(r.Context(), "claims", claims)
           next.ServeHTTP(w, r.WithContext(ctx))
       })
   }
   ```

### Data Validation

1. **Input Validation**
   ```go
   type CreateUserRequest struct {
       Email    string `json:"email" validate:"required,email"`
       Password string `json:"password" validate:"required,min=8"`
   }

   func (s *UserService) CreateUser(ctx context.Context, req *CreateUserRequest) error {
       if err := validator.New().Struct(req); err != nil {
           return fmt.Errorf("invalid request: %w", err)
       }
       // Process request
   }
   ```

2. **Output Sanitization**
   ```go
   func sanitizeUser(user *User) *User {
       return &User{
           ID:        user.ID,
           Email:     user.Email,
           CreatedAt: user.CreatedAt,
           // Exclude sensitive fields
       }
   }
   ```

## Deployment

### CI/CD Pipeline

1. **GitHub Actions Workflow**
   ```yaml
   name: CI/CD

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Run tests
           run: make test

     build:
       needs: test
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Build Docker images
           run: make docker-build

     deploy:
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Deploy to staging
           run: make deploy-staging
   ```

2. **Docker Build**
   ```dockerfile
   # Dockerfile
   FROM golang:1.20-alpine AS builder
   WORKDIR /app
   COPY . .
   RUN go build -o server ./cmd/server

   FROM alpine:latest
   WORKDIR /app
   COPY --from=builder /app/server .
   EXPOSE 8080
   CMD ["./server"]
   ```

## Documentation

### Code Documentation

1. **Go Documentation**
   ```go
   // Package users provides user management functionality
   package users

   // User represents a user in the system
   type User struct {
       // ID is the unique identifier for the user
       ID string `json:"id"`
       // Email is the user's email address
       Email string `json:"email"`
       // CreatedAt is the timestamp when the user was created
       CreatedAt time.Time `json:"created_at"`
   }
   ```

2. **API Documentation**
   ```go
   // @Summary Create a new user
   // @Description Create a new user with the provided information
   // @Tags users
   // @Accept json
   // @Produce json
   // @Param user body CreateUserRequest true "User information"
   // @Success 201 {object} User
   // @Failure 400 {object} Error
   // @Router /users [post]
   func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
       // Implementation
   }
   ```

### Development Workflow

1. **Branch Strategy**
   - `main` - Production-ready code
   - `develop` - Development branch
   - `feature/*` - Feature branches
   - `bugfix/*` - Bug fix branches
   - `release/*` - Release preparation branches

2. **Commit Guidelines**
   ```
   feat: add user authentication
   fix: resolve database connection issue
   docs: update API documentation
   style: format code according to style guide
   refactor: restructure user service
   test: add unit tests for user creation
   chore: update dependencies
   ```

3. **Code Review Process**
   - Create pull request
   - Request reviews from team members
   - Address review comments
   - Ensure CI passes
   - Merge after approval

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check database connection
   psql -h localhost -U postgres -d foodhouse -c "\l"

   # Check database logs
   docker logs foodhouse-postgres
   ```

2. **gRPC Issues**
   ```bash
   # Check gRPC service
   grpcurl -plaintext localhost:8080 list

   # Test gRPC method
   grpcurl -plaintext -d '{"email":"test@example.com"}' localhost:8080 UserService.CreateUser
   ```

3. **Frontend Issues**
   ```bash
   # Check frontend build
   npm run build

   # Run frontend tests
   npm run test
   ```

### Debugging

1. **Go Debugging**
   ```go
   // Add debug logging
   log.Printf("Creating user: %+v", user)

   // Use debugger
   dlv debug ./cmd/server
   ```

2. **Frontend Debugging**
   ```javascript
   // Add debug logging
   console.log('User data:', user)

   // Use Vue DevTools
   // Install Vue DevTools browser extension
   ```

## Best Practices

### Code Organization

1. **Package Structure**
   ```
   users/
   ├── cmd/
   │   └── server/
   │       └── main.go
   ├── internal/
   │   ├── api/
   │   │   └── handler.go
   │   ├── service/
   │   │   └── service.go
   │   └── repository/
   │       └── repository.go
   └── pkg/
       └── models/
           └── user.go
   ```

2. **Dependency Injection**
   ```go
   type UserService struct {
       repo    IUserRepository
       cache   ICache
       logger  ILogger
   }

   func NewUserService(repo IUserRepository, cache ICache, logger ILogger) *UserService {
       return &UserService{
           repo:    repo,
           cache:   cache,
           logger:  logger,
       }
   }
   ```

### Error Handling

1. **Custom Errors**
   ```go
   var (
       ErrUserNotFound = errors.New("user not found")
       ErrInvalidEmail = errors.New("invalid email")
   )

   func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
       user, err := s.repo.GetByID(ctx, id)
       if err == sql.ErrNoRows {
           return nil, ErrUserNotFound
       }
       if err != nil {
           return nil, fmt.Errorf("failed to get user: %w", err)
       }
       return user, nil
   }
   ```

2. **Error Wrapping**
   ```go
   func (s *UserService) CreateUser(ctx context.Context, user *User) error {
       if err := s.validateUser(user); err != nil {
           return fmt.Errorf("invalid user: %w", err)
       }

       if err := s.repo.Create(ctx, user); err != nil {
           return fmt.Errorf("failed to create user: %w", err)
       }

       return nil
   }
   ```

### Logging

1. **Structured Logging**
   ```go
   type Logger struct {
       logger *zap.Logger
   }

   func (l *Logger) Info(msg string, fields ...zap.Field) {
       l.logger.Info(msg, fields...)
   }

   func (l *Logger) Error(msg string, err error, fields ...zap.Field) {
       l.logger.Error(msg, append(fields, zap.Error(err))...)
   }
   ```

2. **Log Levels**
   ```go
   // Debug - Detailed information for debugging
   logger.Debug("Processing user request", zap.String("user_id", userID))

   // Info - General operational information
   logger.Info("User created successfully", zap.String("user_id", userID))

   // Warn - Warning messages
   logger.Warn("Failed to send welcome email", zap.String("user_id", userID))

   // Error - Error messages
   logger.Error("Failed to create user", zap.Error(err))
   ```

## Contributing

### Development Process

1. **Setup Development Environment**
   ```bash
   # Clone repository
   git clone https://github.com/foodhouse/foodhouseapp.git
   cd foodhouseapp

   # Install dependencies
   make setup
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/user-authentication
   ```

3. **Make Changes**
   ```bash
   # Make code changes
   # Run tests
   make test

   # Format code
   make fmt

   # Run linter
   make lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

5. **Create Pull Request**
   - Push changes to remote
   - Create pull request
   - Request reviews
   - Address feedback
   - Merge after approval

### Code Review Guidelines

1. **Review Checklist**
   - [ ] Code follows style guide
   - [ ] Tests are included
   - [ ] Documentation is updated
   - [ ] No security vulnerabilities
   - [ ] Performance is considered
   - [ ] Error handling is proper
   - [ ] Logging is appropriate

2. **Review Comments**
   - Be constructive
   - Provide examples
   - Explain reasoning
   - Suggest improvements
   - Acknowledge good practices

## Resources

### Documentation

- [Go Documentation](https://golang.org/doc/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [gRPC Documentation](https://grpc.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Tools

- [GoLand](https://www.jetbrains.com/go/)
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [DBeaver](https://dbeaver.io/)

### Learning Resources

- [Go by Example](https://gobyexample.com/)
- [Vue.js Tutorial](https://vuejs.org/tutorial/)
- [gRPC Tutorial](https://grpc.io/docs/tutorials/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html) 