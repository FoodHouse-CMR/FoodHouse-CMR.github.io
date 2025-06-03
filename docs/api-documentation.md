# API Documentation

## Overview

FoodHouse provides a comprehensive set of APIs for managing users, products, orders, payments, and deliveries. The APIs are implemented using gRPC and follow RESTful principles.

## Authentication

All API requests require authentication using JWT tokens. The authentication flow is as follows:

1. User registration/login
2. OTP verification
3. JWT token generation
4. Token usage in subsequent requests

### Authentication Headers

```http
Authorization: Bearer <jwt_token>
```

## API Services

### User Service

#### User Registration

```protobuf
rpc Signup(SignupRequest) returns (SignupResponse)
```

**Request:**
```json
{
  "phone_factor": {
    "type": "SMS_OTP",
    "id": "phone_number",
    "secret_value": "otp"
  },
  "residence_country_iso_code": "string",
  "password": "string",
  "user_type": "FARMER|BUYER",
  "email": "string"
}
```

**Response:**
```json
{
  "user_id": "string",
  "tokens": {
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

#### User Authentication

```protobuf
rpc Authenticate(AuthenticateRequest) returns (AuthenticateResponse)
```

**Request:**
```json
{
  "factors": [
    {
      "type": "SMS_OTP",
      "id": "phone_number",
      "secret_value": "otp"
    }
  ]
}
```

**Response:**
```json
{
  "login_complete": true,
  "tokens": {
    "access_token": "string",
    "refresh_token": "string"
  },
  "user_id": "string"
}
```

### Product Service

#### Create Product

```protobuf
rpc CreateProduct(CreateProductRequest) returns (CreateProductResponse)
```

**Request:**
```json
{
  "user_id": "string",
  "category_id": "string",
  "name": "string",
  "unit_type": "string",
  "amount": {
    "value": "string",
    "currency": "string"
  },
  "description": "string",
  "image": "string",
  "whole_sale": boolean
}
```

**Response:**
```json
{
  "product": {
    "id": "string",
    "category": {
      "id": "string",
      "name": "string",
      "slug": "string"
    },
    "name": "string",
    "unit_type": "string",
    "amount": {
      "value": "string",
      "currency": "string"
    },
    "description": "string",
    "image": "string",
    "created_by": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

#### List Products

```protobuf
rpc ListProducts(ListProductsRequest) returns (ListProductsResponse)
```

**Request:**
```json
{
  "category_id": "string",
  "min_amount": {
    "value": "string",
    "currency": "string"
  },
  "max_amount": {
    "value": "string",
    "currency": "string"
  },
  "search": "string",
  "start_key": "string",
  "count": integer
}
```

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "category": {
        "id": "string",
        "name": "string",
        "slug": "string"
      },
      "name": "string",
      "unit_type": "string",
      "amount": {
        "value": "string",
        "currency": "string"
      },
      "description": "string",
      "image": "string",
      "created_by": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "next_key": "string"
}
```

### Order Service

#### Create Order

```protobuf
rpc CreateOrder(CreateOrderRequest) returns (CreateOrderResponse)
```

**Request:**
```json
{
  "user_id": "string",
  "product_id": "string",
  "quantity": integer,
  "delivery_location": {
    "latitude": double,
    "longitude": double
  }
}
```

**Response:**
```json
{
  "order": {
    "order_number": "string",
    "delivery_location": {
      "latitude": double,
      "longitude": double
    },
    "price": {
      "value": "string",
      "currency": "string"
    },
    "status": "CREATED",
    "product": "string",
    "created_by": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "secret_key": "string",
    "product_owner": "string",
    "payout_phone_number": "string"
  }
}
```

#### List User Orders

```protobuf
rpc ListUserOrders(ListUserOrdersRequest) returns (ListUserOrdersResponse)
```

**Request:**
```json
{
  "user_id": "string",
  "count": integer,
  "start_key": "string",
  "status": "CREATED|PAYMENT_SUCCESSFUL|PAYMENT_FAILED|IN_TRANSIT|DELIVERED|APPROVED"
}
```

**Response:**
```json
{
  "orders": [
    {
      "order_number": "string",
      "delivery_location": {
        "latitude": double,
        "longitude": double
      },
      "price": {
        "value": "string",
        "currency": "string"
      },
      "status": "string",
      "product": "string",
      "created_by": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "secret_key": "string",
      "product_owner": "string",
      "payout_phone_number": "string"
    }
  ],
  "next_key": "string"
}
```

### Payment Service

#### Initiate Payment

```protobuf
rpc InitiatePayment(InitiatePaymentRequest) returns (InitiatePaymentResponse)
```

**Request:**
```json
{
  "payment_entity": "ORDER|SUBSCRIPTION",
  "entity_id": "string",
  "user_id": "string",
  "amount": {
    "value": "string",
    "currency": "string"
  },
  "account": {
    "payment_method": "MOBILE_MONEY|ORANGE_MONEY|CREDIT_CARD",
    "account_number": "string"
  }
}
```

**Response:**
```json
{
  "payment": {
    "id": "string",
    "payment_entity": "string",
    "entity_id": "string",
    "amount": {
      "value": "string",
      "currency": "string"
    },
    "created_by": "string",
    "created_at": "timestamp",
    "expires_at": "timestamp",
    "updated_at": "timestamp",
    "status": "INITIATED|COMPLETED|FAILED|CANCELED",
    "account": {
      "payment_method": "string",
      "account_number": "string"
    }
  }
}
```

#### Confirm Payment

```protobuf
rpc ConfirmPayment(ConfirmPaymentRequest) returns (ConfirmPaymentResponse)
```

**Request:**
```json
{
  "status": "string",
  "reference": "string",
  "amount": "string",
  "currency": "string",
  "operator": "string",
  "code": "string",
  "operator_reference": "string",
  "signature": "string",
  "endpoint": "string",
  "external_reference": "string",
  "phone_number": "string"
}
```

## Error Handling

All API responses follow a standard error format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": [
      {
        "type": "string",
        "message": "string"
      }
    ]
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 100 requests per minute per IP
- 1000 requests per hour per user
- 10000 requests per day per user

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1620000000
```

## API Versioning

The API version is included in the URL path:

```
/v1/users/...
/v1/products/...
/v1/orders/...
/v1/payments/...
```

## Webhooks

The system supports webhooks for real-time notifications. Webhook endpoints can be configured for:

- Order status changes
- Payment status updates
- Delivery status updates
- User registration

### Webhook Payload

```json
{
  "event": "string",
  "timestamp": "timestamp",
  "data": {
    // Event-specific data
  },
  "signature": "string"
}
```

## SDKs and Client Libraries

Official client libraries are available for:

- Go
- JavaScript/TypeScript
- Python
- Java
- Swift
- Kotlin

## API Testing

The API can be tested using:

1. gRPC CLI tools
2. Postman collection
3. Swagger UI
4. Custom test clients

## Best Practices

1. **Authentication**
   - Always use HTTPS
   - Store tokens securely
   - Implement token refresh
   - Handle token expiration

2. **Error Handling**
   - Implement proper error handling
   - Use appropriate HTTP status codes
   - Provide meaningful error messages
   - Log errors for debugging

3. **Performance**
   - Use pagination for large datasets
   - Implement caching where appropriate
   - Optimize payload size
   - Use compression

4. **Security**
   - Validate all input
   - Sanitize output
   - Implement rate limiting
   - Use secure headers

## API Changelog

### Version 1.0.0 (2024-03-20)
- Initial release
- Basic CRUD operations
- Authentication system
- Payment integration

### Version 1.1.0 (2024-04-01)
- Added webhook support
- Enhanced error handling
- Improved rate limiting
- Added new payment methods 