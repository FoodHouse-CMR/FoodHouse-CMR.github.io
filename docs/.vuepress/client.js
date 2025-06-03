import { defineClientConfig } from 'vuepress/client'
import { createPinia } from 'pinia'
import Auth from './components/Auth.vue'
import { useAuthStore } from './stores/auth.js'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({

  layouts: {
    Layout
  },


  enhance({ app, router }) {
    // Install Pinia
    const pinia = createPinia()
    app.use(pinia)
    // Register components globally
    app.component('Auth', Auth)

    // Make auth store available globally
    const authStore = useAuthStore()
    app.config.globalProperties.$auth = authStore

    // Create a single initialization promise
    const authInitialization = authStore.initializeAuth()

    // Set up router guards after auth is initialized
    if (router) {
      router.beforeEach(async (to, from, next) => {
        // Skip auth checks during build/SSR
        if (typeof window === 'undefined') {
          next()
          return
        }

        // console.log('🚦 Navigation guard triggered:', from.path, '->', to.path)

        // Always wait for auth to be fully initialized
        if (!authStore.initialized) {
          await authStore.initializeAuth()
        }

        // Allow access to the landing page (/) without authentication
        if (to.path === '/') {
          next()
          return
        }

        // Protect all other routes
        try {
          const isAuthenticated = await authStore.auth0client?.isAuthenticated()
          if (!isAuthenticated) {
            console.log('🔒 Auth required but not authenticated, redirecting to login')
            authStore.redirectToLogin(to.fullPath)
            return
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          authStore.redirectToLogin(to.fullPath)
          return
        }

        // No guard required, proceed with navigation
        next()
      })
    }
  },

  setup() {
    return {}
  }
})