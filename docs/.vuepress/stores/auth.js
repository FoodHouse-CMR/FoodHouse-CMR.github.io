import { defineStore } from 'pinia'
import auth from '../auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth0client: null,
    loading: true,
    error: null,
    initialized: false,
    router: null
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
      if (this.initialized) {
        console.log('Auth already initialized, skipping...')
        return this.auth0client
      }
      
      try {
        this.loading = true
        this.error = null
        
        console.log('Initializing Auth0 client...')
        this.auth0client = await auth.createClient()
        
        // Check if user is already authenticated (from previous session)
        console.log('Checking existing authentication...')
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
        
        await this.auth0client.loginWithPopup()
        this.user = await this.auth0client.getUser()
        
        console.log('Login successful:', this.user)
        
        // Handle redirect after login
        const redirectPath = sessionStorage.getItem('redirectAfterLogin')
        if (redirectPath && typeof window !== 'undefined') {
          sessionStorage.removeItem('redirectAfterLogin')
          console.log('Redirecting to stored path:', redirectPath)
          
          // Use Vue Router if available, otherwise use window.location
          const router = this.router || window.app?.config?.globalProperties.$router
          if (router) {
            setTimeout(() => router.push(redirectPath), 100)
          } else {
            setTimeout(() => window.location.href = redirectPath, 100)
          }
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
        
        await this.auth0client.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        })
        
        // Clear local state
        this.user = null
        console.log('Logout successful')
        
      } catch (error) {
        console.error('Logout failed:', error)
        this.error = error.message
        throw error
      }
    },
    
    clearError() {
      this.error = null
    },
    
    // Method to force refresh user data
    async refreshUser() {
      if (!this.auth0client) return
      
      try {
        this.user = await this.auth0client.getUser()
      } catch (error) {
        console.error('Failed to refresh user:', error)
        this.error = error.message
      }
    },
    
    async autoLogin() {
      console.log('🤖 Starting auto-login process...')
      
      if (!this.auth0client) {
        await this.initializeAuth()
      }
      
      if (this.isAuthenticated) {
        console.log('✅ User already authenticated')
        return true
      }
      
      try {
        this.error = null
        console.log('🚀 Triggering auto-login popup...')
        
        await this.auth0client.loginWithPopup()
        this.user = await this.auth0client.getUser()
        
        console.log('✅ Auto-login successful:', this.user)
        
        // Handle redirect after successful auto-login
        const redirectPath = sessionStorage.getItem('redirectAfterLogin')
        if (redirectPath && typeof window !== 'undefined') {
          sessionStorage.removeItem('redirectAfterLogin')
          console.log('↩️ Redirecting to stored path:', redirectPath)
          
          setTimeout(() => {
            window.location.href = redirectPath
          }, 100)
        }
        
        return true
      } catch (error) {
        console.error('❌ Auto-login failed:', error)
        this.error = error.message
        return false
      }
    }
  }
}) 