# Testing Guide

## Overview

This guide provides comprehensive information about testing the FoodHouse application. It covers unit testing, integration testing, end-to-end testing, and performance testing.

## Unit Testing

### Go Unit Tests

1. **Service Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       // Setup
       mockRepo := new(MockUserRepository)
       service := NewUserService(mockRepo)

       tests := []struct {
           name    string
           user    *User
           wantErr bool
       }{
           {
               name: "valid user",
               user: &User{
                   Email:    "test@example.com",
                   Password: "password123",
               },
               wantErr: false,
           },
           {
               name: "invalid email",
               user: &User{
                   Email:    "invalid-email",
                   Password: "password123",
               },
               wantErr: true,
           },
       }

       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // Setup expectations
               if !tt.wantErr {
                   mockRepo.On("Create", mock.Anything, tt.user).Return(nil)
               }

               // Execute
               err := service.CreateUser(context.Background(), tt.user)

               // Assert
               if tt.wantErr {
                   assert.Error(t, err)
               } else {
                   assert.NoError(t, err)
                   mockRepo.AssertExpectations(t)
               }
           })
       }
   }
   ```

2. **Repository Tests**
   ```go
   func TestUserRepository_Create(t *testing.T) {
       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       tests := []struct {
           name    string
           user    *User
           wantErr bool
       }{
           {
               name: "valid user",
               user: &User{
                   Email:    "test@example.com",
                   Password: "password123",
               },
               wantErr: false,
           },
           {
               name: "duplicate email",
               user: &User{
                   Email:    "test@example.com",
                   Password: "password123",
               },
               wantErr: true,
           },
       }

       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // Execute
               err := repo.Create(context.Background(), tt.user)

               // Assert
               if tt.wantErr {
                   assert.Error(t, err)
               } else {
                   assert.NoError(t, err)
                   assert.NotEmpty(t, tt.user.ID)
               }
           })
       }
   }
   ```

### Vue Component Tests

1. **Component Tests**
   ```javascript
   import { mount } from '@vue/test-utils'
   import UserForm from './UserForm.vue'

   describe('UserForm', () => {
     it('submits form data correctly', async () => {
       const wrapper = mount(UserForm)
       const email = 'test@example.com'
       const password = 'password123'

       await wrapper.find('input[type="email"]').setValue(email)
       await wrapper.find('input[type="password"]').setValue(password)
       await wrapper.find('form').trigger('submit')

       expect(wrapper.emitted('submit')[0][0]).toEqual({
         email,
         password
       })
     })

     it('validates email format', async () => {
       const wrapper = mount(UserForm)
       const invalidEmail = 'invalid-email'

       await wrapper.find('input[type="email"]').setValue(invalidEmail)
       await wrapper.find('form').trigger('submit')

       expect(wrapper.text()).toContain('Invalid email format')
     })
   })
   ```

2. **Store Tests**
   ```javascript
   import { createStore } from 'vuex'
   import userModule from './store/modules/user'

   describe('User Store', () => {
     let store

     beforeEach(() => {
       store = createStore({
         modules: {
           user: userModule
         }
       })
     })

     it('creates user successfully', async () => {
       const userData = {
         email: 'test@example.com',
         password: 'password123'
       }

       await store.dispatch('user/createUser', userData)

       expect(store.state.user.currentUser).toEqual({
         email: userData.email
       })
     })
   })
   ```

## Integration Testing

### API Integration Tests

1. **HTTP Handler Tests**
   ```go
   func TestUserHandler_CreateUser(t *testing.T) {
       // Setup
       mockService := new(MockUserService)
       handler := NewUserHandler(mockService)
       router := setupTestRouter(handler)

       tests := []struct {
           name       string
           payload    string
           wantStatus int
       }{
           {
               name: "valid request",
               payload: `{
                   "email": "test@example.com",
                   "password": "password123"
               }`,
               wantStatus: http.StatusCreated,
           },
           {
               name: "invalid request",
               payload: `{
                   "email": "invalid-email",
                   "password": "123"
               }`,
               wantStatus: http.StatusBadRequest,
           },
       }

       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // Execute
               req := httptest.NewRequest("POST", "/users", strings.NewReader(tt.payload))
               req.Header.Set("Content-Type", "application/json")
               w := httptest.NewRecorder()
               router.ServeHTTP(w, req)

               // Assert
               assert.Equal(t, tt.wantStatus, w.Code)
           })
       }
   }
   ```

2. **gRPC Service Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       // Setup
       mockRepo := new(MockUserRepository)
       service := NewUserService(mockRepo)
       server := grpc.NewServer()
       pb.RegisterUserServiceServer(server, service)

       tests := []struct {
           name    string
           req     *pb.CreateUserRequest
           wantErr bool
       }{
           {
               name: "valid request",
               req: &pb.CreateUserRequest{
                   Email:    "test@example.com",
                   Password: "password123",
               },
               wantErr: false,
           },
           {
               name: "invalid request",
               req: &pb.CreateUserRequest{
                   Email:    "invalid-email",
                   Password: "123",
               },
               wantErr: true,
           },
       }

       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // Execute
               resp, err := service.CreateUser(context.Background(), tt.req)

               // Assert
               if tt.wantErr {
                   assert.Error(t, err)
               } else {
                   assert.NoError(t, err)
                   assert.NotEmpty(t, resp.User.Id)
               }
           })
       }
   }
   ```

### Database Integration Tests

1. **Repository Tests**
   ```go
   func TestUserRepository_Integration(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping integration test")
       }

       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       // Test Create
       user := &User{
           Email:    "test@example.com",
           Password: "password123",
       }
       err := repo.Create(context.Background(), user)
       assert.NoError(t, err)
       assert.NotEmpty(t, user.ID)

       // Test GetByID
       found, err := repo.GetByID(context.Background(), user.ID)
       assert.NoError(t, err)
       assert.Equal(t, user.Email, found.Email)

       // Test Update
       user.Email = "updated@example.com"
       err = repo.Update(context.Background(), user)
       assert.NoError(t, err)

       // Test Delete
       err = repo.Delete(context.Background(), user.ID)
       assert.NoError(t, err)
   }
   ```

2. **Transaction Tests**
   ```go
   func TestUserRepository_Transaction(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping integration test")
       }

       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       // Start transaction
       tx, err := db.BeginTx(context.Background(), nil)
       assert.NoError(t, err)

       // Create user in transaction
       user := &User{
           Email:    "test@example.com",
           Password: "password123",
       }
       err = repo.CreateWithTx(context.Background(), tx, user)
       assert.NoError(t, err)

       // Rollback transaction
       err = tx.Rollback()
       assert.NoError(t, err)

       // Verify user was not created
       _, err = repo.GetByID(context.Background(), user.ID)
       assert.Error(t, err)
   }
   ```

## End-to-End Testing

### API End-to-End Tests

1. **HTTP API Tests**
   ```go
   func TestUserAPI_E2E(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping end-to-end test")
       }

       // Setup test server
       server := setupTestServer(t)
       defer server.Close()

       // Test user creation
       resp, err := http.Post(
           server.URL+"/api/users",
           "application/json",
           strings.NewReader(`{
               "email": "test@example.com",
               "password": "password123"
           }`),
       )
       assert.NoError(t, err)
       assert.Equal(t, http.StatusCreated, resp.StatusCode)

       var user User
       err = json.NewDecoder(resp.Body).Decode(&user)
       assert.NoError(t, err)
       assert.NotEmpty(t, user.ID)

       // Test user retrieval
       resp, err = http.Get(server.URL + "/api/users/" + user.ID)
       assert.NoError(t, err)
       assert.Equal(t, http.StatusOK, resp.StatusCode)

       var found User
       err = json.NewDecoder(resp.Body).Decode(&found)
       assert.NoError(t, err)
       assert.Equal(t, user.Email, found.Email)
   }
   ```

2. **gRPC API Tests**
   ```go
   func TestUserService_E2E(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping end-to-end test")
       }

       // Setup test server
       server := setupTestServer(t)
       defer server.Close()

       // Create client
       conn, err := grpc.Dial(server.Addr, grpc.WithInsecure())
       assert.NoError(t, err)
       defer conn.Close()

       client := pb.NewUserServiceClient(conn)

       // Test user creation
       resp, err := client.CreateUser(context.Background(), &pb.CreateUserRequest{
           Email:    "test@example.com",
           Password: "password123",
       })
       assert.NoError(t, err)
       assert.NotEmpty(t, resp.User.Id)

       // Test user retrieval
       found, err := client.GetUser(context.Background(), &pb.GetUserRequest{
           Id: resp.User.Id,
       })
       assert.NoError(t, err)
       assert.Equal(t, resp.User.Email, found.User.Email)
   }
   ```

### Frontend End-to-End Tests

1. **User Flow Tests**
   ```javascript
   describe('User Flow', () => {
     it('completes user registration and login', async () => {
       // Register new user
       await page.goto('http://localhost:3000/register')
       await page.fill('input[type="email"]', 'test@example.com')
       await page.fill('input[type="password"]', 'password123')
       await page.click('button[type="submit"]')
       await page.waitForNavigation()

       // Verify registration success
       expect(page.url()).toBe('http://localhost:3000/login')

       // Login
       await page.fill('input[type="email"]', 'test@example.com')
       await page.fill('input[type="password"]', 'password123')
       await page.click('button[type="submit"]')
       await page.waitForNavigation()

       // Verify login success
       expect(page.url()).toBe('http://localhost:3000/get-started')
     })
   })
   ```

2. **Product Flow Tests**
   ```javascript
   describe('Product Flow', () => {
     it('completes product creation and listing', async () => {
       // Login
       await page.goto('http://localhost:3000/login')
       await page.fill('input[type="email"]', 'merchant@example.com')
       await page.fill('input[type="password"]', 'password123')
       await page.click('button[type="submit"]')
       await page.waitForNavigation()

       // Create product
       await page.goto('http://localhost:3000/products/new')
       await page.fill('input[name="name"]', 'Test Product')
       await page.fill('input[name="price"]', '10.99')
       await page.fill('textarea[name="description"]', 'Test Description')
       await page.click('button[type="submit"]')
       await page.waitForNavigation()

       // Verify product creation
       expect(page.url()).toBe('http://localhost:3000/products')
       expect(await page.textContent('.product-name')).toBe('Test Product')
     })
   })
   ```

## Performance Testing

### Load Testing

1. **API Load Tests**
   ```go
   func TestUserAPI_Load(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping load test")
       }

       // Setup test server
       server := setupTestServer(t)
       defer server.Close()

       // Define test scenarios
       scenarios := []struct {
           name     string
           requests int
           workers  int
       }{
           {
               name:     "light load",
               requests: 100,
               workers:  10,
           },
           {
               name:     "medium load",
               requests: 1000,
               workers:  50,
           },
           {
               name:     "heavy load",
               requests: 10000,
               workers:  100,
           },
       }

       for _, scenario := range scenarios {
           t.Run(scenario.name, func(t *testing.T) {
               // Create worker pool
               jobs := make(chan int, scenario.requests)
               results := make(chan error, scenario.requests)

               // Start workers
               for w := 0; w < scenario.workers; w++ {
                   go worker(server.URL, jobs, results)
               }

               // Send jobs
               for i := 0; i < scenario.requests; i++ {
                   jobs <- i
               }
               close(jobs)

               // Collect results
               var errors int
               for i := 0; i < scenario.requests; i++ {
                   if err := <-results; err != nil {
                       errors++
                   }
               }

               // Assert error rate
               errorRate := float64(errors) / float64(scenario.requests)
               assert.Less(t, errorRate, 0.01) // Less than 1% error rate
           })
       }
   }
   ```

2. **Database Load Tests**
   ```go
   func TestUserRepository_Load(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping load test")
       }

       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       // Define test scenarios
       scenarios := []struct {
           name     string
           users    int
           workers  int
       }{
           {
               name:     "light load",
               users:    100,
               workers:  10,
           },
           {
               name:     "medium load",
               users:    1000,
               workers:  50,
           },
           {
               name:     "heavy load",
               users:    10000,
               workers:  100,
           },
       }

       for _, scenario := range scenarios {
           t.Run(scenario.name, func(t *testing.T) {
               // Create worker pool
               jobs := make(chan int, scenario.users)
               results := make(chan error, scenario.users)

               // Start workers
               for w := 0; w < scenario.workers; w++ {
                   go func() {
                       for j := range jobs {
                           user := &User{
                               Email:    fmt.Sprintf("test%d@example.com", j),
                               Password: "password123",
                           }
                           err := repo.Create(context.Background(), user)
                           results <- err
                       }
                   }()
               }

               // Send jobs
               for i := 0; i < scenario.users; i++ {
                   jobs <- i
               }
               close(jobs)

               // Collect results
               var errors int
               for i := 0; i < scenario.users; i++ {
                   if err := <-results; err != nil {
                       errors++
                   }
               }

               // Assert error rate
               errorRate := float64(errors) / float64(scenario.users)
               assert.Less(t, errorRate, 0.01) // Less than 1% error rate
           })
       }
   }
   ```

### Stress Testing

1. **API Stress Tests**
   ```go
   func TestUserAPI_Stress(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping stress test")
       }

       // Setup test server
       server := setupTestServer(t)
       defer server.Close()

       // Define test scenarios
       scenarios := []struct {
           name     string
           duration time.Duration
           rps      int
       }{
           {
               name:     "short burst",
               duration: 1 * time.Minute,
               rps:      100,
           },
           {
               name:     "medium burst",
               duration: 5 * time.Minute,
               rps:      50,
           },
           {
               name:     "long burst",
               duration: 30 * time.Minute,
               rps:      10,
           },
       }

       for _, scenario := range scenarios {
           t.Run(scenario.name, func(t *testing.T) {
               // Create ticker for rate limiting
               ticker := time.NewTicker(time.Second / time.Duration(scenario.rps))
               defer ticker.Stop()

               // Create done channel
               done := make(chan bool)
               go func() {
                   time.Sleep(scenario.duration)
                   done <- true
               }()

               // Start stress test
               var errors int
               var total int
               for {
                   select {
                   case <-ticker.C:
                       // Send request
                       resp, err := http.Post(
                           server.URL+"/api/users",
                           "application/json",
                           strings.NewReader(`{
                               "email": "test@example.com",
                               "password": "password123"
                           }`),
                       )
                       total++
                       if err != nil || resp.StatusCode != http.StatusCreated {
                           errors++
                       }
                   case <-done:
                       // Calculate error rate
                       errorRate := float64(errors) / float64(total)
                       assert.Less(t, errorRate, 0.01) // Less than 1% error rate
                       return
                   }
               }
           })
       }
   }
   ```

2. **Database Stress Tests**
   ```go
   func TestUserRepository_Stress(t *testing.T) {
       if testing.Short() {
           t.Skip("skipping stress test")
       }

       // Setup test database
       db := setupTestDB(t)
       defer db.Close()

       repo := NewUserRepository(db)

       // Define test scenarios
       scenarios := []struct {
           name     string
           duration time.Duration
           rps      int
       }{
           {
               name:     "short burst",
               duration: 1 * time.Minute,
               rps:      100,
           },
           {
               name:     "medium burst",
               duration: 5 * time.Minute,
               rps:      50,
           },
           {
               name:     "long burst",
               duration: 30 * time.Minute,
               rps:      10,
           },
       }

       for _, scenario := range scenarios {
           t.Run(scenario.name, func(t *testing.T) {
               // Create ticker for rate limiting
               ticker := time.NewTicker(time.Second / time.Duration(scenario.rps))
               defer ticker.Stop()

               // Create done channel
               done := make(chan bool)
               go func() {
                   time.Sleep(scenario.duration)
                   done <- true
               }()

               // Start stress test
               var errors int
               var total int
               for {
                   select {
                   case <-ticker.C:
                       // Create user
                       user := &User{
                           Email:    fmt.Sprintf("test%d@example.com", total),
                           Password: "password123",
                       }
                       err := repo.Create(context.Background(), user)
                       total++
                       if err != nil {
                           errors++
                       }
                   case <-done:
                       // Calculate error rate
                       errorRate := float64(errors) / float64(total)
                       assert.Less(t, errorRate, 0.01) // Less than 1% error rate
                       return
                   }
               }
           })
       }
   }
   ```

## Test Utilities

### Test Helpers

1. **Database Setup**
   ```go
   func setupTestDB(t *testing.T) *sql.DB {
       // Create test database
       db, err := sql.Open("postgres", "postgres://postgres:secret@localhost:5432/foodhouse_test?sslmode=disable")
       assert.NoError(t, err)

       // Run migrations
       err = migrate.Up(db)
       assert.NoError(t, err)

       // Clean up after test
       t.Cleanup(func() {
           err := migrate.Down(db)
           assert.NoError(t, err)
           db.Close()
       })

       return db
   }
   ```

2. **Test Server Setup**
   ```go
   func setupTestServer(t *testing.T) *httptest.Server {
       // Create test database
       db := setupTestDB(t)

       // Create repository
       repo := NewUserRepository(db)

       // Create service
       service := NewUserService(repo)

       // Create handler
       handler := NewUserHandler(service)

       // Create router
       router := setupRouter(handler)

       // Create test server
       server := httptest.NewServer(router)

       // Clean up after test
       t.Cleanup(func() {
           server.Close()
       })

       return server
   }
   ```

### Mock Objects

1. **Repository Mock**
   ```go
   type MockUserRepository struct {
       mock.Mock
   }

   func (m *MockUserRepository) Create(ctx context.Context, user *User) error {
       args := m.Called(ctx, user)
       return args.Error(0)
   }

   func (m *MockUserRepository) GetByID(ctx context.Context, id string) (*User, error) {
       args := m.Called(ctx, id)
       if args.Get(0) == nil {
           return nil, args.Error(1)
       }
       return args.Get(0).(*User), args.Error(1)
   }

   func (m *MockUserRepository) Update(ctx context.Context, user *User) error {
       args := m.Called(ctx, user)
       return args.Error(0)
   }

   func (m *MockUserRepository) Delete(ctx context.Context, id string) error {
       args := m.Called(ctx, id)
       return args.Error(0)
   }
   ```

2. **Service Mock**
   ```go
   type MockUserService struct {
       mock.Mock
   }

   func (m *MockUserService) CreateUser(ctx context.Context, user *User) error {
       args := m.Called(ctx, user)
       return args.Error(0)
   }

   func (m *MockUserService) GetUser(ctx context.Context, id string) (*User, error) {
       args := m.Called(ctx, id)
       if args.Get(0) == nil {
           return nil, args.Error(1)
       }
       return args.Get(0).(*User), args.Error(1)
   }

   func (m *MockUserService) UpdateUser(ctx context.Context, user *User) error {
       args := m.Called(ctx, user)
       return args.Error(0)
   }

   func (m *MockUserService) DeleteUser(ctx context.Context, id string) error {
       args := m.Called(ctx, id)
       return args.Error(0)
   }
   ```

## Test Coverage

### Coverage Reports

1. **Go Coverage**
   ```bash
   # Generate coverage report
   go test -coverprofile=coverage.out ./...

   # View coverage report
   go tool cover -html=coverage.out
   ```

2. **JavaScript Coverage**
   ```bash
   # Generate coverage report
   npm run test:coverage

   # View coverage report
   open coverage/lcov-report/index.html
   ```

### Coverage Requirements

1. **Go Coverage**
   ```yaml
   # .golangci.yaml
   linters:
     enable:
       - gocritic
       - gocyclo
       - gofmt
       - goimports
       - gosec
       - govet
       - ineffassign
       - staticcheck
       - structcheck
       - typecheck
       - unused
       - varcheck

   linters-settings:
     gocritic:
       enabled-tags:
         - diagnostic
         - experimental
         - opinionated
         - performance
         - style
     gocyclo:
       min-complexity: 15
     govet:
       check-shadowing: true
     staticcheck:
       checks:
         - all
         - -ST1000
         - -ST1003
         - -ST1016
         - -ST1020
         - -ST1021
         - -ST1022
         - -ST1023
   ```

2. **JavaScript Coverage**
   ```json
   {
     "jest": {
       "collectCoverageFrom": [
         "src/**/*.{js,jsx}",
         "!src/**/*.test.{js,jsx}",
         "!src/index.js",
         "!src/serviceWorker.js"
       ],
       "coverageThreshold": {
         "global": {
           "branches": 80,
           "functions": 80,
           "lines": 80,
           "statements": 80
         }
       }
     }
   }
   ```

## Test Documentation

### Test Cases

1. **API Test Cases**
   ```markdown
   # User API Test Cases

   ## Create User
   - Valid user data
   - Invalid email format
   - Duplicate email
   - Missing required fields
   - Invalid password format

   ## Get User
   - Valid user ID
   - Invalid user ID
   - Unauthorized access
   - Expired token

   ## Update User
   - Valid update data
   - Invalid update data
   - Unauthorized access
   - Non-existent user

   ## Delete User
   - Valid user ID
   - Invalid user ID
   - Unauthorized access
   - Non-existent user
   ```

2. **Component Test Cases**
   ```markdown
   # User Form Component Test Cases

   ## Form Submission
   - Valid form data
   - Invalid email format
   - Password too short
   - Required fields missing
   - Server error handling

   ## Form Validation
   - Email format validation
   - Password strength validation
   - Required field validation
   - Custom validation rules

   ## Error Handling
   - Network error
   - Server error
   - Validation error
   - Timeout error
   ```

### Test Reports

1. **Test Summary**
   ```markdown
   # Test Summary

   ## Unit Tests
   - Total: 100
   - Passed: 98
   - Failed: 2
   - Coverage: 85%

   ## Integration Tests
   - Total: 50
   - Passed: 48
   - Failed: 2
   - Coverage: 75%

   ## End-to-End Tests
   - Total: 20
   - Passed: 18
   - Failed: 2
   - Coverage: 60%

   ## Performance Tests
   - Load Tests: Passed
   - Stress Tests: Passed
   - Bottleneck: Database queries
   ```

2. **Test Metrics**
   ```markdown
   # Test Metrics

   ## Response Time
   - Average: 100ms
   - P95: 200ms
   - P99: 300ms

   ## Error Rate
   - Average: 0.1%
   - Peak: 0.5%
   - Threshold: 1%

   ## Throughput
   - Average: 1000 RPS
   - Peak: 2000 RPS
   - Target: 5000 RPS
   ```

## Test Resources

### Documentation

- [Go Testing](https://golang.org/pkg/testing/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [k6 Documentation](https://k6.io/docs/)

### Tools

- [Go Test](https://golang.org/pkg/testing/)
- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)
- [k6](https://k6.io/)

### Training

- [Go Testing Tutorial](https://golang.org/doc/tutorial/add-a-test)
- [Jest Tutorial](https://jestjs.io/docs/tutorial-react)
- [Playwright Tutorial](https://playwright.dev/docs/intro)
- [k6 Tutorial](https://k6.io/docs/getting-started) 