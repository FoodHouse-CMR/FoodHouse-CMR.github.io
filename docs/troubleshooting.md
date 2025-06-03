# Troubleshooting Guide

## Overview

This guide provides comprehensive information about troubleshooting common issues in the FoodHouse application. It covers debugging techniques, error handling, and problem resolution strategies.

## Common Issues

### Application Issues

1. **Application Not Starting**
   ```bash
   # Check application logs
   kubectl logs deployment/foodhouse

   # Check application status
   kubectl get pods -l app=foodhouse

   # Check application events
   kubectl describe pod -l app=foodhouse
   ```

2. **High CPU Usage**
   ```bash
   # Check CPU usage
   kubectl top pods -l app=foodhouse

   # Check CPU limits
   kubectl describe pod -l app=foodhouse | grep -A 5 "Resources:"

   # Check CPU metrics
   curl -s localhost:9090/metrics | grep cpu
   ```

3. **High Memory Usage**
   ```bash
   # Check memory usage
   kubectl top pods -l app=foodhouse

   # Check memory limits
   kubectl describe pod -l app=foodhouse | grep -A 5 "Resources:"

   # Check memory metrics
   curl -s localhost:9090/metrics | grep memory
   ```

### Database Issues

1. **Database Connection Issues**
   ```bash
   # Check database connection
   kubectl exec -it $(kubectl get pod -l app=foodhouse -o jsonpath="{.items[0].metadata.name}") -- nc -zv postgres 5432

   # Check database logs
   kubectl logs -l app=postgres

   # Check database status
   kubectl get pods -l app=postgres
   ```

2. **Slow Queries**
   ```sql
   -- Check slow queries
   SELECT query, calls, total_time, mean_time
   FROM pg_stat_statements
   ORDER BY mean_time DESC
   LIMIT 10;

   -- Check table statistics
   SELECT schemaname, relname, seq_scan, seq_tup_read, idx_scan, idx_tup_fetch
   FROM pg_stat_user_tables
   ORDER BY seq_scan DESC;
   ```

3. **Database Space Issues**
   ```sql
   -- Check database size
   SELECT pg_size_pretty(pg_database_size('foodhouse'));

   -- Check table sizes
   SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
   FROM pg_catalog.pg_statio_user_tables
   ORDER BY pg_total_relation_size(relid) DESC;
   ```

### Cache Issues

1. **Redis Connection Issues**
   ```bash
   # Check Redis connection
   kubectl exec -it $(kubectl get pod -l app=foodhouse -o jsonpath="{.items[0].metadata.name}") -- nc -zv redis 6379

   # Check Redis logs
   kubectl logs -l app=redis

   # Check Redis status
   kubectl get pods -l app=redis
   ```

2. **Cache Performance Issues**
   ```bash
   # Check Redis memory usage
   kubectl exec -it $(kubectl get pod -l app=redis -o jsonpath="{.items[0].metadata.name}") -- redis-cli info memory

   # Check Redis keys
   kubectl exec -it $(kubectl get pod -l app=redis -o jsonpath="{.items[0].metadata.name}") -- redis-cli keys "*"

   # Check Redis slow log
   kubectl exec -it $(kubectl get pod -l app=redis -o jsonpath="{.items[0].metadata.name}") -- redis-cli slowlog get 10
   ```

3. **Cache Eviction Issues**
   ```bash
   # Check Redis eviction policy
   kubectl exec -it $(kubectl get pod -l app=redis -o jsonpath="{.items[0].metadata.name}") -- redis-cli config get maxmemory-policy

   # Check Redis eviction stats
   kubectl exec -it $(kubectl get pod -l app=redis -o jsonpath="{.items[0].metadata.name}") -- redis-cli info stats | grep evicted
   ```

### Message Queue Issues

1. **RabbitMQ Connection Issues**
   ```bash
   # Check RabbitMQ connection
   kubectl exec -it $(kubectl get pod -l app=foodhouse -o jsonpath="{.items[0].metadata.name}") -- nc -zv rabbitmq 5672

   # Check RabbitMQ logs
   kubectl logs -l app=rabbitmq

   # Check RabbitMQ status
   kubectl get pods -l app=rabbitmq
   ```

2. **Queue Performance Issues**
   ```bash
   # Check RabbitMQ queue status
   kubectl exec -it $(kubectl get pod -l app=rabbitmq -o jsonpath="{.items[0].metadata.name}") -- rabbitmqctl list_queues

   # Check RabbitMQ message rates
   kubectl exec -it $(kubectl get pod -l app=rabbitmq -o jsonpath="{.items[0].metadata.name}") -- rabbitmqctl list_queues name messages_ready messages_unacknowledged

   # Check RabbitMQ node status
   kubectl exec -it $(kubectl get pod -l app=rabbitmq -o jsonpath="{.items[0].metadata.name}") -- rabbitmqctl cluster_status
   ```

3. **Message Processing Issues**
   ```bash
   # Check dead letter queue
   kubectl exec -it $(kubectl get pod -l app=rabbitmq -o jsonpath="{.items[0].metadata.name}") -- rabbitmqctl list_queues name messages_ready messages_unacknowledged | grep dead-letter

   # Check message rates
   kubectl exec -it $(kubectl get pod -l app=rabbitmq -o jsonpath="{.items[0].metadata.name}") -- rabbitmqctl list_queues name message_stats.publish_details.rate message_stats.deliver_details.rate
   ```

## Debugging Techniques

### Logging

1. **Application Logs**
   ```go
   // Configure logging
   func configureLogging() {
       log.SetFormatter(&log.JSONFormatter{})
       log.SetOutput(os.Stdout)
       log.SetLevel(log.InfoLevel)
   }

   // Log with context
   func logWithContext(ctx context.Context, level log.Level, msg string, fields log.Fields) {
       logger := log.WithFields(fields)
       logger.WithField("request_id", ctx.Value("request_id")).Log(level, msg)
   }
   ```

2. **Structured Logging**
   ```go
   // Structured logging
   type LogEntry struct {
       Timestamp   time.Time     `json:"timestamp"`
       Level       string        `json:"level"`
       Message     string        `json:"message"`
       RequestID   string        `json:"request_id"`
       UserID      string        `json:"user_id"`
       Service     string        `json:"service"`
       Environment string        `json:"environment"`
       Fields      log.Fields    `json:"fields"`
   }

   // Log entry
   func logEntry(entry LogEntry) {
       data, err := json.Marshal(entry)
       if err != nil {
           log.Error("Failed to marshal log entry:", err)
           return
       }
       fmt.Println(string(data))
   }
   ```

### Tracing

1. **Distributed Tracing**
   ```go
   // Configure tracing
   func configureTracing() {
       tracer, err := jaeger.NewTracer(
           "foodhouse",
           jaeger.NewConstSampler(true),
           jaeger.NewNullReporter(),
       )
       if err != nil {
           log.Fatal("Failed to create tracer:", err)
       }
       opentracing.SetGlobalTracer(tracer)
   }

   // Start span
   func startSpan(ctx context.Context, operationName string) (opentracing.Span, context.Context) {
       span, ctx := opentracing.StartSpanFromContext(ctx, operationName)
       return span, ctx
   }
   ```

2. **Trace Propagation**
   ```go
   // Extract trace context
   func extractTraceContext(r *http.Request) (opentracing.SpanContext, error) {
       return opentracing.GlobalTracer().Extract(
           opentracing.HTTPHeaders,
           opentracing.HTTPHeadersCarrier(r.Header),
       )
   }

   // Inject trace context
   func injectTraceContext(span opentracing.Span, r *http.Request) error {
       return opentracing.GlobalTracer().Inject(
           span.Context(),
           opentracing.HTTPHeaders,
           opentracing.HTTPHeadersCarrier(r.Header),
       )
   }
   ```

### Metrics

1. **Application Metrics**
   ```go
   // Configure metrics
   func configureMetrics() {
       http.Handle("/metrics", promhttp.Handler())
       go http.ListenAndServe(":9090", nil)
   }

   // Record metrics
   var (
       httpRequestsTotal = prometheus.NewCounterVec(
           prometheus.CounterOpts{
               Name: "http_requests_total",
               Help: "Total number of HTTP requests",
           },
           []string{"method", "endpoint", "status"},
       )
       httpRequestDuration = prometheus.NewHistogramVec(
           prometheus.HistogramOpts{
               Name: "http_request_duration_seconds",
               Help: "HTTP request duration in seconds",
           },
           []string{"method", "endpoint"},
       )
   )
   ```

2. **Custom Metrics**
   ```go
   // Custom metrics
   var (
       orderProcessingTime = prometheus.NewHistogram(
           prometheus.HistogramOpts{
               Name: "order_processing_time_seconds",
               Help: "Time taken to process an order",
           },
       )
       paymentProcessingTime = prometheus.NewHistogram(
           prometheus.HistogramOpts{
               Name: "payment_processing_time_seconds",
               Help: "Time taken to process a payment",
           },
       )
   )
   ```

## Error Handling

### Error Types

1. **Application Errors**
   ```go
   // Application error
   type AppError struct {
       Code    string
       Message string
       Err     error
   }

   func (e *AppError) Error() string {
       return fmt.Sprintf("%s: %s", e.Code, e.Message)
   }

   // Error codes
   const (
       ErrInvalidInput     = "INVALID_INPUT"
       ErrNotFound         = "NOT_FOUND"
       ErrUnauthorized     = "UNAUTHORIZED"
       ErrInternal         = "INTERNAL_ERROR"
       ErrServiceUnavailable = "SERVICE_UNAVAILABLE"
   )
   ```

2. **Validation Errors**
   ```go
   // Validation error
   type ValidationError struct {
       Field   string
       Message string
   }

   func (e *ValidationError) Error() string {
       return fmt.Sprintf("%s: %s", e.Field, e.Message)
   }

   // Validate input
   func validateInput(input interface{}) error {
       validate := validator.New()
       if err := validate.Struct(input); err != nil {
           return &ValidationError{
               Field:   err.Field(),
               Message: err.Error(),
           }
       }
       return nil
   }
   ```

### Error Recovery

1. **Panic Recovery**
   ```go
   // Recover from panic
   func recoverFromPanic() {
       if r := recover(); r != nil {
           log.Printf("Recovered from panic: %v", r)
           debug.PrintStack()
       }
   }

   // Middleware
   func panicRecoveryMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           defer recoverFromPanic()
           next.ServeHTTP(w, r)
       })
   }
   ```

2. **Error Handling Middleware**
   ```go
   // Error handling middleware
   func errorHandlingMiddleware(next http.Handler) http.Handler {
       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
           defer func() {
               if err := recover(); err != nil {
                   handleError(w, r, err)
               }
           }()
           next.ServeHTTP(w, r)
       })
   }

   // Handle error
   func handleError(w http.ResponseWriter, r *http.Request, err interface{}) {
       var status int
       var message string

       switch e := err.(type) {
       case *AppError:
           status = getStatusCode(e.Code)
           message = e.Message
       case *ValidationError:
           status = http.StatusBadRequest
           message = e.Message
       default:
           status = http.StatusInternalServerError
           message = "Internal server error"
       }

       w.WriteHeader(status)
       json.NewEncoder(w).Encode(map[string]string{
           "error": message,
       })
   }
   ```

## Problem Resolution

### Performance Issues

1. **CPU Profiling**
   ```go
   // CPU profiling
   func startCPUProfile() {
       f, err := os.Create("cpu.prof")
       if err != nil {
           log.Fatal("Could not create CPU profile:", err)
       }
       if err := pprof.StartCPUProfile(f); err != nil {
           log.Fatal("Could not start CPU profile:", err)
       }
   }

   func stopCPUProfile() {
       pprof.StopCPUProfile()
   }
   ```

2. **Memory Profiling**
   ```go
   // Memory profiling
   func writeMemoryProfile() {
       f, err := os.Create("mem.prof")
       if err != nil {
           log.Fatal("Could not create memory profile:", err)
       }
       if err := pprof.WriteHeapProfile(f); err != nil {
           log.Fatal("Could not write memory profile:", err)
       }
       f.Close()
   }
   ```

### Database Issues

1. **Query Optimization**
   ```sql
   -- Analyze query
   EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = $1;

   -- Create index
   CREATE INDEX idx_orders_user_id ON orders(user_id);

   -- Vacuum analyze
   VACUUM ANALYZE orders;
   ```

2. **Connection Pooling**
   ```go
   // Configure connection pool
   func configureDB() *sql.DB {
       db, err := sql.Open("postgres", "postgres://user:pass@localhost:5432/foodhouse?sslmode=disable")
       if err != nil {
           log.Fatal(err)
       }

       db.SetMaxOpenConns(25)
       db.SetMaxIdleConns(25)
       db.SetConnMaxLifetime(5 * time.Minute)

       return db
   }
   ```

### Cache Issues

1. **Cache Optimization**
   ```go
   // Cache optimization
   func optimizeCache() {
       // Set appropriate TTL
       cache.Set("key", value, 5*time.Minute)

       // Use pipeline for multiple operations
       pipe := cache.Pipeline()
       pipe.Set("key1", value1, 5*time.Minute)
       pipe.Set("key2", value2, 5*time.Minute)
       pipe.Exec()
   }
   ```

2. **Cache Invalidation**
   ```go
   // Cache invalidation
   func invalidateCache(pattern string) error {
       keys, err := cache.Keys(pattern).Result()
       if err != nil {
           return err
       }

       if len(keys) > 0 {
           _, err = cache.Del(keys...).Result()
       }

       return err
   }
   ```

## Monitoring and Alerts

### Health Checks

1. **Application Health**
   ```go
   // Health check
   func healthCheck(w http.ResponseWriter, r *http.Request) {
       health := map[string]string{
           "status": "healthy",
           "time":   time.Now().String(),
       }

       if err := checkDB(); err != nil {
           health["status"] = "unhealthy"
           health["error"] = err.Error()
       }

       w.Header().Set("Content-Type", "application/json")
       json.NewEncoder(w).Encode(health)
   }
   ```

2. **Service Health**
   ```go
   // Service health check
   func serviceHealthCheck() error {
       // Check database
       if err := checkDB(); err != nil {
           return err
       }

       // Check cache
       if err := checkCache(); err != nil {
           return err
       }

       // Check message queue
       if err := checkQueue(); err != nil {
           return err
       }

       return nil
   }
   ```

### Alerts

1. **Alert Configuration**
   ```yaml
   # Alert configuration
   groups:
   - name: foodhouse
     rules:
     - alert: HighErrorRate
       expr: rate(http_errors_total[5m]) > 0.1
       for: 5m
       labels:
         severity: critical
       annotations:
         summary: High error rate detected
         description: Error rate is above 10% for 5 minutes

     - alert: HighLatency
       expr: http_request_duration_seconds > 1
       for: 5m
       labels:
         severity: warning
       annotations:
         summary: High latency detected
         description: Request latency is above 1 second for 5 minutes
   ```

2. **Alert Notifications**
   ```yaml
   # Alert notifications
   receivers:
   - name: 'team-foodhouse'
     email_configs:
     - to: 'team@foodhouse.com'
       from: 'alerts@foodhouse.com'
       smarthost: 'smtp.foodhouse.com:587'
       auth_username: 'alerts'
       auth_password: 'secret'

   route:
     group_by: ['alertname']
     group_wait: 30s
     group_interval: 5m
     repeat_interval: 4h
     receiver: 'team-foodhouse'
   ```

## Best Practices

### Debugging

1. **Logging Best Practices**
   - Use structured logging
   - Include context in logs
   - Set appropriate log levels
   - Rotate log files

2. **Tracing Best Practices**
   - Use distributed tracing
   - Propagate trace context
   - Set appropriate sampling rate
   - Monitor trace data

### Error Handling

1. **Error Handling Best Practices**
   - Use custom error types
   - Include error context
   - Handle errors at appropriate level
   - Log errors with stack trace

2. **Recovery Best Practices**
   - Implement panic recovery
   - Use error handling middleware
   - Monitor error rates
   - Alert on critical errors

### Performance

1. **Performance Best Practices**
   - Profile application regularly
   - Optimize database queries
   - Use connection pooling
   - Implement caching

2. **Monitoring Best Practices**
   - Set up health checks
   - Configure alerts
   - Monitor key metrics
   - Review logs regularly 