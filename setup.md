# VuePress Auth0 Authentication Setup Guide

This document provides a complete setup guide for implementing Auth0 authentication in VuePress with Pinia state management and page-level guards.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Configuration Files](#configuration-files)
5. [State Management (Pinia)](#state-management-pinia)
6. [Authentication Guards](#authentication-guards)
7. [Components](#components)
8. [Example Pages](#example-pages)
9. [Usage Patterns](#usage-patterns)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 16+ 
- VuePress 2.x
- Auth0 account and application configured

## Installation

### 1. Install Dependencies

```bash
npm install pinia
```

### 2. Auth0 Configuration

Update your Auth0 configuration in `docs/.vuepress/auth/auth_config.js`:

```javascript
const config = {
  domain: "your-auth0-domain.auth0.com",  // Replace with your Auth0 domain
  clientId: "your-client-id-here"         // Replace with your Auth0 client ID
};

export default config;
```

## Project Structure 

docs/
├── .vuepress/
│ ├── auth/
│ │ ├── index.js # Auth0 wrapper functions
│ │ └── auth_config.js # Auth0 configuration
│ ├── stores/
│ │ └── auth.js # Pinia auth store
│ ├── middleware/
│ │ └── guards.js # Authentication guards
│ ├── config/
│ │ └── routes.js # Route guard configuration
│ ├── components/
│ │ ├── LoginButton.vue # Login component
│ │ ├── LogoutButton.vue # Logout component
│ │ ├── AuthLayout.vue # Main auth layout
│ │ └── UserProfile.vue # User profile component
│ ├── client.js # VuePress client configuration
│ └── config.js # VuePress main configuration
├── README.md # Landing page
├── dashboard.md # Protected dashboard
├── profile.md # User profile page
├── admin.md # Admin-only page
└── unauthorized.md # Unauthorized access page
```

## Configuration Files

### VuePress Configuration (`docs/.vuepress/config.js`)

```javascript
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'en-US',
  title: 'VuePress Auth App',
  description: 'VuePress with Auth0 Authentication',

  head: [
    ["script", { src: "https://cdn.auth0.com/js/auth0-spa-js/1.13/auth0-spa-js.production.js" }]
  ],

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [
      '/', 
      '/dashboard', 
      '/profile', 
      '/admin'
    ],
  }),

  bundler: viteBundler(),

  plugins: [
    {
      name: 'custom-alias',
      alias: {
        '@auth': path.resolve(__dirname, './auth'),
        '@components': path.resolve(__dirname, './components'),
        '@stores': path.resolve(__dirname, './stores'),
      },
    },
  ],
})
```

### Auth0 Wrapper (`docs/.vuepress/auth/index.js`)

```javascript
import config from "./auth_config";

// Wait for Auth0 to be loaded
function waitForAuth0() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Auth0 can only be used in browser environment'));
      return;
    }

    if (window.createAuth0Client) {
      resolve(window.createAuth0Client);
      return;
    }

    // Wait for script to load
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    const checkInterval = setInterval(() => {
      attempts++;
      if (window.createAuth0Client) {
        clearInterval(checkInterval);
        resolve(window.createAuth0Client);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error('Auth0 SDK failed to load within timeout'));
      }
    }, 100);
  });
}

async function createClient() {
  try {
    const createAuth0Client = await waitForAuth0();
    
    const auth0Client = await createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });

    return auth0Client;
  } catch (error) {
    console.error('Failed to create Auth0 client:', error);
    throw error;
  }
}

async function loginWithPopup(client, options = {}) {
  try {
    await client.loginWithPopup(options);
  } catch (e) {
    console.error('Login error:', e);
    throw e;
  }
}

async function logout(client) {
  try {
    await client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  } catch (e) {
    console.error('Logout error:', e);
    throw e;
  }
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;
```

## State Management (Pinia)

### Pinia Auth Store (`docs/.vuepress/stores/auth.js`)

```javascript
import { defineStore } from 'pinia'
import auth from '../auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth0client: null,
    loading: true,
    error: null,
    initialized: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => {
      if (!state.user) return 'Guest'
      return state.user.name || state.user.given_name || 'User'
    },
    userEmail: (state) => state.user?.email || '',
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error
  },
  
  actions: {
    async initializeAuth() {
      if (this.initialized) return this.auth0client
      
      try {
        this.loading = true
        this.error = null
        
        console.log('Initializing Auth0 client...')
        this.auth0client = await auth.createClient()
        
        console.log('Getting user...')
        this.user = await this.auth0client.getUser()
        
        console.log('Auth initialized:', { 
          user: this.user, 
          isAuthenticated: this.isAuthenticated 
        })
        
        this.initialized = true
      } catch (error) {
        console.error('Auth initialization failed:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
      
      return this.auth0client
    },
    
    async login() {
      if (!this.auth0client) {
        await this.initializeAuth()
      }
      
      try {
        this.error = null
        console.log('Starting login...')
        
        await auth.loginWithPopup(this.auth0client)
        this.user = await this.auth0client.getUser()
        
        console.log('Login successful:', this.user)
        
        // Handle redirect after login
        const redirectPath = sessionStorage.getItem('redirectAfterLogin')
        if (redirectPath && typeof window !== 'undefined') {
          sessionStorage.removeItem('redirectAfterLogin')
          setTimeout(() => {
            window.location.href = redirectPath
          }, 100)
        }
        
      } catch (error) {
        console.error('Login failed:', error)
        this.error = error.message
        throw error
      }
    },
    
    async logout() {
      if (!this.auth0client) return
      
      try {
        this.error = null
        console.log('Starting logout...')
        
        await auth.logout(this.auth0client)
        this.user = null
        
        console.log('Logout successful')
        
        // Redirect to home after logout
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/'
          }, 100)
        }
        
      } catch (error) {
        console.error('Logout failed:', error)
        this.error = error.message
        throw error
      }
    },
    
    clearError() {
      this.error = null
    },
    
    // Method to check if user has specific permissions/roles
    hasRole(role) {
      if (!this.user) return false
      const userRoles = this.user['https://your-app.com/roles'] || []
      return userRoles.includes(role)
    },
    
    // Method to check if user has any of the specified roles
    hasAnyRole(roles) {
      return roles.some(role => this.hasRole(role))
    }
  }
})
```

## Authentication Guards

### Guards Implementation (`docs/.vuepress/middleware/guards.js`)

```javascript
import { useAuthStore } from '../stores/auth.js'

// Auth guard - requires authentication
export async function requireAuth(to, from, next) {
  const authStore = useAuthStore()
  
  console.log('Auth guard: checking authentication for', to.path)
  
  // Initialize auth if not already done
  if (!authStore.initialized) {
    try {
      await authStore.initializeAuth()
    } catch (error) {
      console.error('Auth initialization failed in guard:', error)
      sessionStorage.setItem('redirectAfterLogin', to.fullPath)
      next('/')
      return
    }
  }
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    console.log('User not authenticated, redirecting to landing page')
    sessionStorage.setItem('redirectAfterLogin', to.fullPath)
    next('/')
    return
  }
  
  console.log('Auth guard: user authenticated, proceeding')
  next()
}

// Guest guard - requires no authentication (redirects if authenticated)
export async function requireGuest(to, from, next) {
  const authStore = useAuthStore()
  
  console.log('Guest guard: checking for', to.path)
  
  if (!authStore.initialized) {
    await authStore.initializeAuth()
  }
  
  // If user is authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    console.log('User is authenticated, redirecting from guest-only page')
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard'
    sessionStorage.removeItem('redirectAfterLogin')
    next(redirectPath)
    return
  }
  
  console.log('Guest guard: user not authenticated, proceeding')
  next()
}

// Role guard - requires specific role
export function requireRole(roles) {
  return async (to, from, next) => {
    const authStore = useAuthStore()
    
    console.log('Role guard: checking roles', roles, 'for', to.path)
    
    // First check authentication
    await requireAuth(to, from, (result) => {
      if (result !== undefined) {
        next(result)
        return
      }
      
      // User is authenticated, now check roles
      if (!authStore.hasAnyRole(Array.isArray(roles) ? roles : [roles])) {
        console.log('User does not have required roles:', roles)
        next('/unauthorized')
        return
      }
      
      console.log('Role guard: user has required roles, proceeding')
      next()
    })
  }
}

// Admin guard - requires admin role
export const requireAdmin = requireRole(['admin'])

// Moderator guard - requires moderator or admin role
export const requireModerator = requireRole(['moderator', 'admin'])
```

### Route Configuration (`docs/.vuepress/config/routes.js`)

```javascript
import { requireAuth, requireGuest, requireAdmin, requireModerator } from '../middleware/guards.js'

export const routeGuards = {
  // Public routes (no guards)
  '/': null,
  '/about': null,
  '/contact': null,
  '/get-started': null,
  '/unauthorized': null,
  
  // Guest-only routes
  '/login': requireGuest,
  '/register': requireGuest,
  
  // Protected routes
  '/dashboard': requireAuth,
  '/profile': requireAuth,
  '/settings': requireAuth,
  
  // Admin routes
  '/admin': requireAdmin,
  '/admin/*': requireAdmin,
  
  // Moderator routes
  '/moderate': requireModerator,
  '/moderate/*': requireModerator,
}

// Helper function to get guard for a route
export function getRouteGuard(path) {
  // Check exact match first
  if (routeGuards[path]) {
    return routeGuards[path]
  }
  
  // Check wildcard matches
  for (const [route, guard] of Object.entries(routeGuards)) {
    if (route.endsWith('/*')) {
      const basePath = route.slice(0, -2)
      if (path.startsWith(basePath)) {
        return guard
      }
    }
  }
  
  return null
}
```

### Client Configuration (`docs/.vuepress/client.js`)

```javascript
import { defineClientConfig } from 'vuepress/client'
import { createPinia } from 'pinia'
import LoginButton from './components/LoginButton.vue'
import LogoutButton from './components/LogoutButton.vue'
import AuthLayout from './components/AuthLayout.vue'
import UserProfile from './components/UserProfile.vue'
import { useAuthStore } from './stores/auth.js'
import { getRouteGuard } from './config/routes.js'

export default defineClientConfig({
  enhance({ app, router }) {
    // Install Pinia
    const pinia = createPinia()
    app.use(pinia)
    
    // Register components globally
    app.component('LoginButton', LoginButton)
    app.component('LogoutButton', LogoutButton)
    app.component('AuthLayout', AuthLayout)
    app.component('UserProfile', UserProfile)
    
    // Make auth store available globally
    app.config.globalProperties.$auth = useAuthStore()
    
    // Register global navigation guard
    if (router) {
      router.beforeEach(async (to, from, next) => {
        console.log('Navigation guard triggered:', from.path, '->', to.path)
        
        // Check for page-specific frontmatter guards first
        const pageData = to.meta?.frontmatter || {}
        
        if (pageData.requireAuth) {
          const { requireAuth } = await import('./middleware/guards.js')
          await requireAuth(to, from, next)
          return
        }
        
        if (pageData.requireGuest) {
          const { requireGuest } = await import('./middleware/guards.js')
          await requireGuest(to, from, next)
          return
        }
        
        if (pageData.requireRole) {
          const { requireRole } = await import('./middleware/guards.js')
          const roleGuard = requireRole(pageData.requireRole)
          await roleGuard(to, from, next)
          return
        }
        
        // Check route-based guards
        const guard = getRouteGuard(to.path)
        if (guard) {
          await guard(to, from, next)
          return
        }
        
        // No guard required, proceed
        next()
      })
    }
  },
  
  setup() {
    // Initialize auth on app startup
    if (typeof window !== 'undefined') {
      const authStore = useAuthStore()
      authStore.initializeAuth()
    }
    
    return {}
  }
})
```

## Components

### Login Button (`docs/.vuepress/components/LoginButton.vue`)

```vue
<template>
  <button 
    @click="handleLogin" 
    class="auth-button login-button" 
    :disabled="authStore.loading"
  >
    {{ authStore.loading ? 'Logging in...' : 'Login' }}
  </button>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'LoginButton',
  setup() {
    const authStore = useAuthStore()
    
    const handleLogin = async () => {
      try {
        await authStore.login()
      } catch (error) {
        console.error('Login button error:', error)
      }
    }
    
    return {
      authStore,
      handleLogin
    }
  }
}
</script>

<style scoped>
.auth-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.login-button {
  background-color: #007bff;
  color: white;
}

.login-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### Logout Button (`docs/.vuepress/components/LogoutButton.vue`)

```vue
<template>
  <button @click="handleLogout" class="auth-button logout-button">
    Log Out
  </button>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'LogoutButton',
  setup() {
    const authStore = useAuthStore()
    
    const handleLogout = async () => {
      try {
        await authStore.logout()
      } catch (error) {
        console.error('Logout button error:', error)
      }
    }
    
    return {
      authStore,
      handleLogout
    }
  }
}
</script>

<style scoped>
.auth-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.logout-button {
  background-color: #dc3545;
  color: white;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
```

### Auth Layout (`docs/.vuepress/components/AuthLayout.vue`)

```vue
<template>
  <div class="main-content">
    <div v-if="authStore.loading">
      <p align="center">⏳ Loading...</p>
    </div>
    <div v-else-if="authStore.error">
      <p align="center" style="color: red;">❌ Error: {{ authStore.error }}</p>
      <p align="center">
        <button @click="authStore.clearError()" class="retry-button">
          Clear Error
        </button>
      </p>
    </div>
    <div v-else-if="authStore.isAuthenticated">
      <p align="center">
        👋 Hi {{ authStore.userName }}, Welcome to the Vuepress Blog
      </p>
      <p align="center">
        <LogoutButton />
      </p>
    </div>
    <div v-else>
      <p align="center">
        🔐 You are currently not logged-in to the Application. Please use the login button below to sign in
      </p>
      <p align="center">
        <LoginButton />
      </p>
    </div>
    
    <!-- Debug info -->
    <div v-if="debug" style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
      <p><strong>🐛 Debug Info:</strong></p>
      <p>Auth0 Client: {{ authStore.auth0client ? '✅ Loaded' : '❌ Not loaded' }}</p>
      <p>User: {{ authStore.isAuthenticated ? '✅ Logged in' : '❌ Not logged in' }}</p>
      <p>Loading: {{ authStore.loading ? '⏳ Yes' : '✅ No' }}</p>
      <p>Error: {{ authStore.error || '✅ None' }}</p>
      <p>Initialized: {{ authStore.initialized ? '✅ Yes' : '❌ No' }}</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'AuthLayout',
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore,
      debug: true // Set to false in production
    }
  }
}
</script>

<style scoped>
.main-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.retry-button {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  background-color: #5a6268;
}
</style>
```

### User Profile (`docs/.vuepress/components/UserProfile.vue`)

```vue
<template>
  <div class="user-profile" v-if="authStore.isAuthenticated">
    <div class="profile-header">
      <img 
        :src="authStore.user.picture" 
        :alt="authStore.userName"
        class="profile-avatar"
        v-if="authStore.user.picture"
      >
      <div class="profile-info">
        <h3>{{ authStore.userName }}</h3>
        <p>{{ authStore.userEmail }}</p>
      </div>
    </div>
    
    <div class="profile-actions">
      <LogoutButton />
    </div>
  </div>
  <div v-else>
    <p>Please log in to view your profile.</p>
    <LoginButton />
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'UserProfile',
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.profile-info h3 {
  margin: 0 0 5px 0;
}

.profile-info p {
  margin: 0;
  color: #666;
}

.profile-actions {
  text-align: center;
}
</style>
```

## Example Pages

### Landing Page (`docs/README.md`)

```markdown
---
home: true
requireGuest: true
footer: Made by Auth0 User with ❤️
---

<AuthLayout />
```

### Dashboard (`docs/dashboard.md`)

```markdown
---
requireAuth: true
title: Dashboard
---

# Dashboard

Welcome to your protected dashboard!

<UserProfile />

## Quick Actions

- [View Profile](/profile)
- [Settings](/settings)
- [Admin Panel](/admin) (Admin only)

<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>
```

### Profile Page (`docs/profile.md`)

```markdown
---
requireAuth: true
title: User Profile
---

# User Profile

<UserProfile />

<div v-if="authStore.user">
  <h2>User Details</h2>
  <pre>{{ JSON.stringify(authStore.user, null, 2) }}</pre>
</div>

<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>
```

### Admin Page (`docs/admin.md`)

```markdown
---
requireRole: ["admin"]
title: Admin Panel
---

# Admin Panel

This page is only accessible to administrators.

<div v-if="authStore.hasRole('admin')">
  <h2>Admin Controls</h2>
  <p>Welcome, admin {{ authStore.userName }}!</p>
  
  <!-- Admin-specific content here -->
</div>

<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>
```

### Unauthorized Page (`docs/unauthorized.md`)

```markdown
---
title: Unauthorized
---

# Unauthorized Access

You don't have permission to access the requested page.

<div class="unauthorized-content">
  <p>🚫 Sorry, you don't have the required permissions to view this content.</p>
  
  <div v-if="authStore.isAuthenticated">
    <p>You are logged in as: {{ authStore.userName }}</p>
    <p>Contact an administrator if you believe this is an error.</p>
  </div>
  <div v-else>
    <p>Please log in to continue.</p>
    <LoginButton />
  </div>
  
  <p><a href="/">← Back to Home</a></p>
</div>

<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>

<style scoped>
.unauthorized-content {
  text-align: center;
  padding: 40px 20px;
}
</style>
```

## Usage Patterns

### Frontmatter Guards

Add these to your page frontmatter:

```yaml
---
requireAuth: true        # Requires authentication
requireGuest: true       # Requires no authentication (guest only)
requireRole: ["admin"]   # Requires specific role(s)
---
```

### Component Usage

```vue
<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>
```

### Role Checking

```javascript
// Check single role
authStore.hasRole('admin')

// Check multiple roles (user needs ANY of these)
authStore.hasAnyRole(['admin', 'moderator'])

// In template
<div v-if="authStore.hasRole('admin')">
  Admin content
</div>
```

### Route-Based Protection

Routes are automatically protected based on the configuration in `routes.js`:

- `/dashboard` - Requires authentication
- `/admin/*` - Requires admin role
- `/moderate/*` - Requires moderator or admin role

## Troubleshooting

### Common Issues

1. **Components not showing**: Ensure components are registered in `client.js`
2. **Auth0 not loading**: Check CDN script in `config.js` head section
3. **Guards not working**: Verify router is available in `client.js`
4. **Pinia errors**: Make sure Pinia is installed and configured properly

### Debug Mode

Enable debug mode in `AuthLayout.vue` by setting `debug: true` to see:
- Auth0 client status
- User authentication status
- Loading states
- Error messages
- Initialization status

### Console Logs

The setup includes comprehensive console logging:
- Auth initialization
- Login/logout processes
- Guard execution
- Navigation events

Check browser console for detailed information about the authentication flow.

## Development Commands

```bash
# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Clean cache and restart
npm run docs:clean-dev
```

## Security Notes

1. **Auth0 Configuration**: Never commit real Auth0 credentials to version control
2. **Role Claims**: Configure role claims in Auth0 dashboard
3. **HTTPS**: Use HTTPS in production for Auth0 callbacks
4. **Session Storage**: Redirect paths are stored in session storage temporarily

This setup provides a complete, production-ready authentication system with flexible page-level guards and robust state management using Pinia.


docs/
├── .vuepress/
│ ├── auth/
│ │ ├── index.js # Auth0 wrapper functions
│ │ └── auth_config.js # Auth0 configuration
│ ├── stores/
│ │ └── auth.js # Pinia auth store
│ ├── middleware/
│ │ └── guards.js # Authentication guards
│ ├── config/
│ │ └── routes.js # Route guard configuration
│ ├── components/
│ │ ├── LoginButton.vue # Login component
│ │ ├── LogoutButton.vue # Logout component
│ │ ├── AuthLayout.vue # Main auth layout
│ │ └── UserProfile.vue # User profile component
│ ├── client.js # VuePress client configuration
│ └── config.js # VuePress main configuration
├── README.md # Landing page
├── dashboard.md # Protected dashboard
├── profile.md # User profile page
├── admin.md # Admin-only page
└── unauthorized.md # Unauthorized access page