---
home: true
title: FoodHouse Documentation
heroImage: https://vuejs.press/images/hero.png
actions:
  - text: Get Started
    link: /development.html
    type: primary
  - text: System Overview
    link: /system-overview.html
    type: secondary

features:
  - title: E-commerce Platform
    details: A comprehensive e-commerce platform specialized in agricultural produce trading and management.
  - title: Modern Architecture
    details: Built with modern technologies and best practices for scalability and performance.
  - title: Developer Friendly
    details: Well-documented APIs, clear architecture, and comprehensive guides for developers.
  - title: Secure & Reliable
    details: Enterprise-grade security features and robust error handling for reliable operations.
  - title: Easy Integration
    details: Simple API integration with detailed documentation and example implementations.
  - title: Scalable Solution
    details: Designed to scale with your business needs, from small farms to large agricultural enterprises.

footer: MIT Licensed | Copyright © 2025 FoodHouse
---

# Welcome to FoodHouse

Welcome to the FoodHouse documentation. This documentation provides comprehensive information about the FoodHouse e-commerce platform for agricultural produce.

## Quick Start

To get started with FoodHouse:

1. Clone the repository
2. Follow the [Development Guide](./development.md) for local setup
3. Refer to [Deployment Guide](./deployment.md) for production deployment
4. Check [API Documentation](./api-documentation.md) for integration details

## Documentation Sections

- [System Overview](./system-overview.md) - High-level system architecture and components
- [Architecture](./architecture.md) - Detailed technical architecture and design decisions
- [API Documentation](./api-documentation.md) - Complete API reference and integration guides
- [Database Schema](./database-schema.md) - Database structure and relationships
- [Deployment Guide](./deployment.md) - Production deployment instructions
- [Development Guide](./development.md) - Local development setup and guidelines
- [Security](./security.md) - Security features and best practices
- [Testing](./testing.md) - Testing strategies and implementation

## Contributing

Please read our [Contributing Guide](./contributing.md) before submitting any changes.

<!-- Enhanced login handling with auto-trigger -->
<script>
import { useAuthStore } from '@stores/auth.js'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const authStore = useAuthStore()
    const loginTriggered = ref(false)
    
    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const loginRequired = urlParams.get('login') === 'required'
      
      if (loginRequired) {
        // Clear the URL parameter immediately
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
        
        if (!authStore.isAuthenticated && !loginTriggered.value) {
          loginTriggered.value = true
          try {
            await authStore.login()
          } catch (error) {
            console.error('Auto-login failed:', error)
            loginTriggered.value = false
          }
        }
      }
    })
    
    return {
      authStore,
      loginTriggered
    }
  }
}
</script> 