import { defineClientConfig } from 'vuepress/client'
import { createPinia } from 'pinia'
import Auth from './components/Auth.vue'
import { useAuthStore } from './stores/auth.js'
import { getRouteGuard } from './config/routes.js'
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
    app.config.globalProperties.$auth = useAuthStore()

    // Register global navigation guard
    if (router) {
      router.beforeEach(async (to, from, next) => {
        console.log('🚦 Navigation guard triggered:', from.path, '->', to.path)

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

        // No guard required, but still initialize auth for state consistency
        const { checkAuth } = await import('./middleware/guards.js')
        await checkAuth(to, from, next)
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