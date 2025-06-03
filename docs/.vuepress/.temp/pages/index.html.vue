<template><div><h1 id="foodhouse-platform" tabindex="-1"><a class="header-anchor" href="#foodhouse-platform"><span>FoodHouse Platform</span></a></h1>
<p>Welcome to the FoodHouse documentation. FoodHouse is a specialized e-commerce platform designed for agricultural produce trading, connecting farmers directly with buyers in a secure and efficient marketplace.</p>
<h2 id="key-features" tabindex="-1"><a class="header-anchor" href="#key-features"><span>Key Features</span></a></h2>
<ul>
<li><strong>Direct Farm-to-Consumer Trading</strong>: Connect farmers directly with buyers</li>
<li><strong>Real-time Inventory Management</strong>: Track produce availability and pricing</li>
<li><strong>Secure Payment Processing</strong>: Integrated payment solutions with escrow services</li>
<li><strong>Quality Assurance</strong>: Built-in quality control and verification processes</li>
<li><strong>Analytics Dashboard</strong>: Comprehensive insights for both farmers and buyers</li>
<li><strong>Mobile-First Design</strong>: Access the platform from any device</li>
</ul>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start"><span>Quick Start</span></a></h2>
<p>To get started with FoodHouse:</p>
<ol>
<li>Clone the repository</li>
<li>Follow the <RouteLink to="/development.html">Development Guide</RouteLink> for local setup</li>
<li>Refer to <RouteLink to="/deployment.html">Deployment Guide</RouteLink> for production deployment</li>
<li>Check <RouteLink to="/api-documentation.html">API Documentation</RouteLink> for integration details</li>
</ol>
<h2 id="documentation-sections" tabindex="-1"><a class="header-anchor" href="#documentation-sections"><span>Documentation Sections</span></a></h2>
<ul>
<li><RouteLink to="/system-overview.html">System Overview</RouteLink> - High-level system architecture and components</li>
<li><RouteLink to="/architecture.html">Architecture</RouteLink> - Detailed technical architecture and design decisions</li>
<li><RouteLink to="/api-documentation.html">API Documentation</RouteLink> - Complete API reference and integration guides</li>
<li><RouteLink to="/database-schema.html">Database Schema</RouteLink> - Database structure and relationships</li>
<li><RouteLink to="/deployment.html">Deployment Guide</RouteLink> - Production deployment instructions</li>
<li><RouteLink to="/development.html">Development Guide</RouteLink> - Local development setup and guidelines</li>
<li><RouteLink to="/security.html">Security</RouteLink> - Security features and best practices</li>
<li><RouteLink to="/testing.html">Testing</RouteLink> - Testing strategies and implementation</li>
</ul>
<h2 id="contributing" tabindex="-1"><a class="header-anchor" href="#contributing"><span>Contributing</span></a></h2>
<p>Please read our <RouteLink to="/contributing.html">Contributing Guide</RouteLink> before submitting any changes.</p>
<!-- Enhanced login handling with auto-trigger -->
</div></template>

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
