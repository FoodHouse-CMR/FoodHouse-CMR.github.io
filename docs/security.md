# Security Guide

## Overview

This guide provides comprehensive information about security measures implemented in the FoodHouse application. It covers authentication, authorization, data protection, API security, and infrastructure security.

## Authentication

### JWT Authentication

1. **Token Generation**
   ```go
   func (s *UserService) GenerateToken(user *User) (string, error) {
       claims := jwt.MapClaims{
           "sub": user.ID,
           "email": user.Email,
           "role": user.Role,
           "exp": time.Now().Add(time.Hour * 24).Unix(),
           "iat": time.Now().Unix(),
       }
       token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
       return token.SignedString([]byte(s.jwtSecret))
   }
   ```

2. **Token Validation**
   ```go
   func validateToken(tokenString string) (*jwt.Token, error) {
       return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
           if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
               return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
           }
           return []byte(jwtSecret), nil
       })
   }
   ```

### OAuth2 Integration

1. **OAuth2 Configuration**
   ```go
   var oauth2Config = &oauth2.Config{
       ClientID:     os.Getenv("OAUTH_CLIENT_ID"),
       ClientSecret: os.Getenv("OAUTH_CLIENT_SECRET"),
       RedirectURL:  "http://localhost:8080/oauth/callback",
       Scopes:       []string{"email", "profile"},
       Endpoint:     google.Endpoint,
   }
   ```

2. **OAuth2 Handler**
   ```go
   func (h *AuthHandler) OAuthCallback(w http.ResponseWriter, r *http.Request) {
       code := r.URL.Query().Get("code")
       token, err := oauth2Config.Exchange(r.Context(), code)
       if err != nil {
           http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
           return
       }

       // Get user info
       client := oauth2Config.Client(r.Context(), token)
       resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
       if err != nil {
           http.Error(w, "Failed to get user info", http.StatusInternalServerError)
           return
       }
       defer resp.Body.Close()

       // Process user info and create session
   }
   ```

## Authorization

### Role-Based Access Control (RBAC)

1. **Role Definitions**
   ```go
   type Role string

   const (
       RoleAdmin    Role = "admin"
       RoleMerchant Role = "merchant"
       RoleCustomer Role = "customer"
   )

   type Permission string

   const (
       PermissionCreateProduct Permission = "create:product"
       PermissionUpdateProduct Permission = "update:product"
       PermissionDeleteProduct Permission = "delete:product"
       PermissionViewOrders    Permission = "view:orders"
   )
   ```

2. **Permission Check**
   ```go
   func (s *UserService) HasPermission(userID string, permission Permission) (bool, error) {
       user, err := s.repo.GetByID(context.Background(), userID)
       if err != nil {
           return false, err
       }

       // Get role permissions
       permissions, err := s.getRolePermissions(user.Role)
       if err != nil {
           return false, err
       }

       // Check if user has permission
       for _, p := range permissions {
           if p == permission {
               return true, nil
           }
       }

       return false, nil
   }
   ```

### Middleware Implementation

1. **Auth Middleware**
   ```go
   func AuthMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           token := r.Header.Get("Authorization")
           if token == "" {
               http.Error(w, "unauthorized", http.StatusUnauthorized)
               return
           }

           claims, err := validateToken(token)
           if err != nil {
               http.Error(w, "invalid token", http.StatusUnauthorized)
               return
           }

           ctx := context.WithValue(r.Context(), "claims", claims)
           next.ServeHTTP(w, r.WithContext(ctx))
       })
   }
   ```

2. **Permission Middleware**
   ```go
   func RequirePermission(permission Permission) func(http.Handler) http.Handler {
       return func(next http.Handler) http.Handler {
           return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
               claims := r.Context().Value("claims").(jwt.MapClaims)
               userID := claims["sub"].(string)

               hasPermission, err := userService.HasPermission(userID, permission)
               if err != nil || !hasPermission {
                   http.Error(w, "forbidden", http.StatusForbidden)
                   return
               }

               next.ServeHTTP(w, r)
           })
       }
   }
   ```

## Data Protection

### Encryption

1. **Data Encryption**
   ```go
   type Encryptor struct {
       key []byte
   }

   func (e *Encryptor) Encrypt(data []byte) ([]byte, error) {
       block, err := aes.NewCipher(e.key)
       if err != nil {
           return nil, err
       }

       gcm, err := cipher.NewGCM(block)
       if err != nil {
           return nil, err
       }

       nonce := make([]byte, gcm.NonceSize())
       if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
           return nil, err
       }

       return gcm.Seal(nonce, nonce, data, nil), nil
   }
   ```

2. **Data Decryption**
   ```go
   func (e *Encryptor) Decrypt(data []byte) ([]byte, error) {
       block, err := aes.NewCipher(e.key)
       if err != nil {
           return nil, err
       }

       gcm, err := cipher.NewGCM(block)
       if err != nil {
           return nil, err
       }

       nonceSize := gcm.NonceSize()
       if len(data) < nonceSize {
           return nil, errors.New("ciphertext too short")
       }

       nonce, ciphertext := data[:nonceSize], data[nonceSize:]
       return gcm.Open(nil, nonce, ciphertext, nil)
   }
   ```

### Password Hashing

1. **Password Hashing**
   ```go
   func HashPassword(password string) (string, error) {
       bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
       return string(bytes), err
   }
   ```

2. **Password Verification**
   ```go
   func CheckPasswordHash(password, hash string) bool {
       err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
       return err == nil
   }
   ```

## API Security

### Rate Limiting

1. **Rate Limiter Implementation**
   ```go
   type RateLimiter struct {
       redis *redis.Client
   }

   func (rl *RateLimiter) IsAllowed(key string, limit int, window time.Duration) (bool, error) {
       current := rl.redis.Incr(context.Background(), key).Val()
       if current == 1 {
           rl.redis.Expire(context.Background(), key, window)
       }
       return current <= int64(limit), nil
   }
   ```

2. **Rate Limiter Middleware**
   ```go
   func RateLimit(limit int, window time.Duration) func(http.Handler) http.Handler {
       return func(next http.Handler) http.Handler {
           return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
               key := fmt.Sprintf("ratelimit:%s", r.RemoteAddr)
               allowed, err := rateLimiter.IsAllowed(key, limit, window)
               if err != nil || !allowed {
                   http.Error(w, "too many requests", http.StatusTooManyRequests)
                   return
               }
               next.ServeHTTP(w, r)
           })
       }
   }
   ```

### Input Validation

1. **Request Validation**
   ```go
   type CreateUserRequest struct {
       Email    string `json:"email" validate:"required,email"`
       Password string `json:"password" validate:"required,min=8"`
       Role     string `json:"role" validate:"required,oneof=admin merchant customer"`
   }

   func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
       var req CreateUserRequest
       if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
           http.Error(w, "invalid request", http.StatusBadRequest)
           return
       }

       if err := validator.New().Struct(req); err != nil {
           http.Error(w, err.Error(), http.StatusBadRequest)
           return
       }

       // Process request
   }
   ```

2. **SQL Injection Prevention**
   ```go
   func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*User, error) {
       query := `
           SELECT id, email, role, created_at
           FROM users
           WHERE email = $1
       `
       var user User
       err := r.db.QueryRowContext(ctx, query, email).Scan(
           &user.ID,
           &user.Email,
           &user.Role,
           &user.CreatedAt,
       )
       if err != nil {
           return nil, err
       }
       return &user, nil
   }
   ```

## Infrastructure Security

### Network Security

1. **Network Policies**
   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: NetworkPolicy
   metadata:
     name: foodhouse-network-policy
     namespace: foodhouse
   spec:
     podSelector:
       matchLabels:
         app: foodhouse
     policyTypes:
     - Ingress
     - Egress
     ingress:
     - from:
       - namespaceSelector:
           matchLabels:
             name: ingress-nginx
       ports:
       - protocol: TCP
         port: 8080
     egress:
     - to:
       - namespaceSelector:
           matchLabels:
             name: kube-system
       ports:
       - protocol: TCP
         port: 53
   ```

2. **SSL/TLS Configuration**
   ```yaml
   apiVersion: cert-manager.io/v1
   kind: Certificate
   metadata:
     name: foodhouse-cert
     namespace: foodhouse
   spec:
     secretName: foodhouse-tls
     issuerRef:
       name: letsencrypt-prod
       kind: ClusterIssuer
     dnsNames:
       - api.foodhouse.com
       - www.foodhouse.com
   ```

### Container Security

1. **Security Context**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: users
     namespace: foodhouse
   spec:
     template:
       spec:
         securityContext:
           runAsNonRoot: true
           runAsUser: 1000
           runAsGroup: 1000
         containers:
         - name: users
           securityContext:
             allowPrivilegeEscalation: false
             capabilities:
               drop:
               - ALL
   ```

2. **Pod Security Policies**
   ```yaml
   apiVersion: policy/v1beta1
   kind: PodSecurityPolicy
   metadata:
     name: foodhouse-psp
   spec:
     privileged: false
     seLinux:
       rule: RunAsAny
     runAsUser:
       rule: MustRunAsNonRoot
     fsGroup:
       rule: MustRunAs
       ranges:
       - min: 1
         max: 65535
   ```

## Security Monitoring

### Logging

1. **Security Event Logging**
   ```go
   type SecurityLogger struct {
       logger *zap.Logger
   }

   func (l *SecurityLogger) LogAuthAttempt(userID string, success bool, err error) {
       l.logger.Info("authentication attempt",
           zap.String("user_id", userID),
           zap.Bool("success", success),
           zap.Error(err),
       )
   }

   func (l *SecurityLogger) LogPermissionDenied(userID string, permission string) {
       l.logger.Warn("permission denied",
           zap.String("user_id", userID),
           zap.String("permission", permission),
       )
   }
   ```

2. **Audit Logging**
   ```go
   type AuditLogger struct {
       logger *zap.Logger
   }

   func (l *AuditLogger) LogUserAction(userID string, action string, resource string) {
       l.logger.Info("user action",
           zap.String("user_id", userID),
           zap.String("action", action),
           zap.String("resource", resource),
           zap.Time("timestamp", time.Now()),
       )
   }
   ```

### Monitoring

1. **Security Metrics**
   ```go
   var (
       authAttempts = prometheus.NewCounterVec(
           prometheus.CounterOpts{
               Name: "auth_attempts_total",
               Help: "Total number of authentication attempts",
           },
           []string{"success"},
       )

       permissionDenied = prometheus.NewCounterVec(
           prometheus.CounterOpts{
               Name: "permission_denied_total",
               Help: "Total number of permission denied events",
           },
           []string{"permission"},
       )
   )
   ```

2. **Alerting Rules**
   ```yaml
   groups:
   - name: security
     rules:
     - alert: HighAuthFailures
       expr: rate(auth_attempts_total{success="false"}[5m]) > 10
       for: 5m
       labels:
         severity: warning
       annotations:
         summary: High number of authentication failures
         description: Authentication failures are above threshold

     - alert: PermissionDeniedSpike
       expr: rate(permission_denied_total[5m]) > 5
       for: 5m
       labels:
         severity: warning
       annotations:
         summary: Spike in permission denied events
         description: Permission denied events are above threshold
   ```

## Security Best Practices

### Code Security

1. **Dependency Scanning**
   ```bash
   # Scan Go dependencies
   go list -json -m all | nancy sleuth

   # Scan Node.js dependencies
   npm audit
   ```

2. **Code Scanning**
   ```bash
   # Run static analysis
   golangci-lint run

   # Run security scanner
   gosec ./...
   ```

### Configuration Security

1. **Secret Management**
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: foodhouse-secrets
     namespace: foodhouse
   type: Opaque
   data:
     jwt-secret: base64-encoded-secret
     db-password: base64-encoded-password
     api-key: base64-encoded-key
   ```

2. **Environment Variables**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: users
     namespace: foodhouse
   spec:
     template:
       spec:
         containers:
         - name: users
           env:
           - name: JWT_SECRET
             valueFrom:
               secretKeyRef:
                 name: foodhouse-secrets
                 key: jwt-secret
           - name: DB_PASSWORD
             valueFrom:
               secretKeyRef:
                 name: foodhouse-secrets
                 key: db-password
   ```

## Security Incident Response

### Incident Response Plan

1. **Detection**
   - Monitor security logs
   - Review alert notifications
   - Investigate suspicious activities

2. **Containment**
   - Isolate affected systems
   - Block malicious IPs
   - Revoke compromised credentials

3. **Eradication**
   - Remove malware
   - Patch vulnerabilities
   - Update security controls

4. **Recovery**
   - Restore from backups
   - Verify system integrity
   - Resume normal operations

### Incident Response Procedures

1. **Security Breach**
   ```bash
   # 1. Identify affected systems
   kubectl get pods -n foodhouse

   # 2. Isolate affected pods
   kubectl scale deployment users --replicas=0 -n foodhouse

   # 3. Revoke compromised credentials
   kubectl delete secret foodhouse-secrets -n foodhouse

   # 4. Restore from backup
   ./restore.sh foodhouse_backup.sql.gz
   ```

2. **DDoS Attack**
   ```bash
   # 1. Enable rate limiting
   kubectl patch deployment users -n foodhouse --patch '
   {
     "spec": {
       "template": {
         "spec": {
           "containers": [{
             "name": "users",
             "env": [{
               "name": "RATE_LIMIT",
               "value": "100"
             }]
           }]
         }
       }
     }
   }'

   # 2. Block malicious IPs
   kubectl apply -f network-policy.yaml
   ```

## Security Compliance

### GDPR Compliance

1. **Data Protection**
   ```go
   type UserData struct {
       ID        string    `json:"id"`
       Email     string    `json:"email"`
       CreatedAt time.Time `json:"created_at"`
       // Exclude sensitive data
   }

   func (s *UserService) GetUserData(ctx context.Context, userID string) (*UserData, error) {
       user, err := s.repo.GetByID(ctx, userID)
       if err != nil {
           return nil, err
       }

       return &UserData{
           ID:        user.ID,
           Email:     user.Email,
           CreatedAt: user.CreatedAt,
       }, nil
   }
   ```

2. **Data Deletion**
   ```go
   func (s *UserService) DeleteUserData(ctx context.Context, userID string) error {
       // Anonymize user data
       if err := s.repo.AnonymizeUser(ctx, userID); err != nil {
           return err
       }

       // Delete user data
       if err := s.repo.DeleteUser(ctx, userID); err != nil {
           return err
       }

       return nil
   }
   ```

### PCI DSS Compliance

1. **Payment Data Protection**
   ```go
   type PaymentService struct {
       encryptor *Encryptor
   }

   func (s *PaymentService) ProcessPayment(ctx context.Context, payment *Payment) error {
       // Encrypt sensitive data
       encryptedCard, err := s.encryptor.Encrypt([]byte(payment.CardNumber))
       if err != nil {
           return err
       }

       // Store encrypted data
       payment.EncryptedCard = encryptedCard
       payment.CardNumber = "" // Clear sensitive data

       return s.repo.SavePayment(ctx, payment)
   }
   ```

2. **Audit Logging**
   ```go
   func (s *PaymentService) LogPaymentAttempt(payment *Payment, success bool) {
       s.auditLogger.Info("payment attempt",
           zap.String("payment_id", payment.ID),
           zap.Bool("success", success),
           zap.Time("timestamp", time.Now()),
       )
   }
   ```

## Security Resources

### Documentation

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Kubernetes Security](https://kubernetes.io/docs/concepts/security/)
- [Go Security](https://golang.org/doc/security)
- [Vue.js Security](https://vuejs.org/guide/best-practices/security.html)

### Tools

- [SonarQube](https://www.sonarqube.org/)
- [Trivy](https://github.com/aquasecurity/trivy)
- [Falco](https://falco.org/)
- [Vault](https://www.vaultproject.io/)

### Training

- [OWASP Web Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Kubernetes Security](https://kubernetes.io/docs/tutorials/security/)
- [Go Security Training](https://golang.org/doc/security)
- [Vue.js Security Training](https://vuejs.org/guide/best-practices/security.html) 