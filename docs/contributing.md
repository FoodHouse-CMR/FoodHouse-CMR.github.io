# Contributing Guide

## Overview

This guide provides comprehensive information about contributing to the FoodHouse project. It covers the development workflow, code standards, testing requirements, and submission process.

## Getting Started

### Prerequisites

1. **Required Tools**
   - Go 1.20+
   - Node.js 18+
   - Docker 20.10+
   - PostgreSQL 13+
   - Redis 6+
   - gRPC tools
   - Protocol Buffers compiler

2. **Development Environment**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/foodhouse.git
   cd foodhouse

   # Install Go dependencies
   go mod download

   # Install Node.js dependencies
   npm install

   # Generate Protocol Buffers
   make proto

   # Start development services
   docker-compose up -d
   ```

### Project Structure

```
foodhouse/
├── cmd/                    # Application entry points
├── internal/              # Private application code
│   ├── users/            # User service
│   ├── products/         # Product service
│   ├── orders/           # Order service
│   └── payments/         # Payment service
├── pkg/                   # Public library code
├── protobuf/             # Protocol Buffer definitions
├── web/                  # Frontend application
└── docs/                 # Documentation
```

## Development Workflow

### Branch Strategy

1. **Main Branches**
   - `main`: Production-ready code
   - `develop`: Integration branch for features

2. **Supporting Branches**
   - `feature/*`: New features
   - `bugfix/*`: Bug fixes
   - `release/*`: Release preparation
   - `hotfix/*`: Production fixes

### Git Workflow

1. **Creating a Feature Branch**
   ```bash
   # Create and switch to feature branch
   git checkout -b feature/user-authentication

   # Push branch to remote
   git push -u origin feature/user-authentication
   ```

2. **Committing Changes**
   ```bash
   # Stage changes
   git add .

   # Commit with conventional commit message
   git commit -m "feat(auth): implement user authentication"

   # Push changes
   git push
   ```

3. **Updating Feature Branch**
   ```bash
   # Fetch latest changes
   git fetch origin

   # Update develop branch
   git checkout develop
   git pull origin develop

   # Update feature branch
   git checkout feature/user-authentication
   git rebase develop
   ```

### Code Review Process

1. **Creating Pull Request**
   - Use PR template
   - Link related issues
   - Add reviewers
   - Add labels

2. **Review Checklist**
   - Code style compliance
   - Test coverage
   - Documentation
   - Performance impact
   - Security considerations

3. **Addressing Feedback**
   - Respond to comments
   - Make requested changes
   - Update PR description
   - Request re-review

## Code Standards

### Go Code Style

1. **Formatting**
   ```bash
   # Format code
   go fmt ./...

   # Run linter
   golangci-lint run
   ```

2. **Naming Conventions**
   ```go
   // Package names
   package userservice

   // Interface names
   type UserRepository interface {
       // ...
   }

   // Function names
   func CreateUser(ctx context.Context, user *User) error {
       // ...
   }

   // Variable names
   var (
       defaultTimeout = 5 * time.Second
       maxRetries    = 3
   )
   ```

3. **Error Handling**
   ```go
   // Return errors
   func (s *Service) DoSomething() error {
       if err := s.validate(); err != nil {
           return fmt.Errorf("validation failed: %w", err)
       }
       return nil
   }

   // Check errors
   if err := s.DoSomething(); err != nil {
       log.Printf("failed to do something: %v", err)
       return err
   }
   ```

### JavaScript Code Style

1. **Formatting**
   ```bash
   # Format code
   npm run format

   # Run linter
   npm run lint
   ```

2. **Naming Conventions**
   ```javascript
   // Component names
   const UserProfile = {
     // ...
   }

   // Function names
   function createUser(userData) {
     // ...
   }

   // Variable names
   const DEFAULT_TIMEOUT = 5000
   const MAX_RETRIES = 3
   ```

3. **Error Handling**
   ```javascript
   // Async/await
   async function doSomething() {
     try {
       await validate()
     } catch (error) {
       console.error('Validation failed:', error)
       throw error
     }
   }

   // Promises
   function doSomething() {
     return validate()
       .catch(error => {
         console.error('Validation failed:', error)
         throw error
       })
   }
   ```

## Testing Requirements

### Go Testing

1. **Unit Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       // Setup
       mockRepo := new(MockUserRepository)
       service := NewUserService(mockRepo)

       // Test cases
       tests := []struct {
           name    string
           user    *User
           wantErr bool
       }{
           // ...
       }

       // Run tests
       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // ...
           })
       }
   }
   ```

2. **Integration Tests**
   ```go
   func TestUserRepository_Integration(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping integration test")
       }

       // Setup
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       // Run tests
       // ...
   }
   ```

### JavaScript Testing

1. **Component Tests**
   ```javascript
   describe('UserForm', () => {
     it('submits form data correctly', async () => {
       const wrapper = mount(UserForm)
       // ...
     })
   })
   ```

2. **Integration Tests**
   ```javascript
   describe('User Flow', () => {
     it('completes user registration and login', async () => {
       // ...
     })
   })
   ```

## Documentation

### Code Documentation

1. **Go Documentation**
   ```go
   // UserService handles user-related operations
   type UserService struct {
       repo UserRepository
   }

   // CreateUser creates a new user
   // Returns error if user already exists
   func (s *UserService) CreateUser(ctx context.Context, user *User) error {
       // ...
   }
   ```

2. **JavaScript Documentation**
   ```javascript
   /**
    * User service for handling user-related operations
    */
   class UserService {
     /**
      * Creates a new user
      * @param {Object} userData - User data
      * @returns {Promise<User>} Created user
      * @throws {Error} If user already exists
      */
     async createUser(userData) {
       // ...
     }
   }
   ```

### API Documentation

1. **OpenAPI/Swagger**
   ```yaml
   openapi: 3.0.0
   info:
     title: FoodHouse API
     version: 1.0.0
   paths:
     /users:
       post:
         summary: Create user
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/User'
         responses:
           '201':
             description: User created
   ```

2. **gRPC Documentation**
   ```protobuf
   // User service for managing users
   service UserService {
     // CreateUser creates a new user
     rpc CreateUser(CreateUserRequest) returns (User) {
       option (google.api.http) = {
         post: "/v1/users"
         body: "*"
       };
     }
   }
   ```

## Release Process

### Versioning

1. **Semantic Versioning**
   - Major: Breaking changes
   - Minor: New features
   - Patch: Bug fixes

2. **Version Tags**
   ```bash
   # Create version tag
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

### Release Checklist

1. **Pre-release**
   - Update version numbers
   - Update changelog
   - Run all tests
   - Check documentation

2. **Release**
   - Create release branch
   - Tag version
   - Build artifacts
   - Deploy to staging

3. **Post-release**
   - Deploy to production
   - Announce release
   - Monitor metrics

## Security

### Security Guidelines

1. **Code Security**
   - Input validation
   - Output sanitization
   - Error handling
   - Secure defaults

2. **Authentication**
   - JWT tokens
   - Password hashing
   - Rate limiting
   - Session management

3. **Authorization**
   - Role-based access
   - Resource ownership
   - Permission checks
   - Audit logging

### Security Reporting

1. **Vulnerability Reporting**
   - Email: security@foodhouse.com
   - Bug bounty program
   - Responsible disclosure

2. **Security Response**
   - Acknowledge report
   - Assess severity
   - Fix vulnerability
   - Release patch

## Community

### Communication

1. **Channels**
   - GitHub Issues
   - GitHub Discussions
   - Slack workspace
   - Mailing list

2. **Meetings**
   - Weekly sync
   - Monthly review
   - Quarterly planning

### Recognition

1. **Contributor Levels**
   - New contributor
   - Active contributor
   - Core contributor
   - Maintainer

2. **Recognition Program**
   - Contributor spotlight
   - Swag program
   - Conference opportunities

## Resources

### Documentation

- [Project Wiki](https://github.com/yourusername/foodhouse/wiki)
- [API Documentation](https://api.foodhouse.com/docs)
- [Architecture Guide](https://github.com/yourusername/foodhouse/wiki/Architecture)

### Tools

- [Development Environment](https://github.com/yourusername/foodhouse/wiki/Development-Environment)
- [Testing Tools](https://github.com/yourusername/foodhouse/wiki/Testing-Tools)
- [CI/CD Pipeline](https://github.com/yourusername/foodhouse/wiki/CI-CD)

### Training

- [Onboarding Guide](https://github.com/yourusername/foodhouse/wiki/Onboarding)
- [Code Review Guide](https://github.com/yourusername/foodhouse/wiki/Code-Review)
- [Security Training](https://github.com/yourusername/foodhouse/wiki/Security) 