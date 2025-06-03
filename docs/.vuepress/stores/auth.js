import { defineStore } from 'pinia'
import auth from '../auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth0client: null,
    loading: false,
    error: null,
    initialized: false,
    initializationPromise: null,
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
    hasError: (state) => !!state.error,
    isInitialized: (state) => state.initialized
  },
  
  actions: {
    async initializeAuth() {
      if (typeof window === 'undefined') return null;
      if (this.initialized) return this.auth0client;
      if (this.initializationPromise) return this.initializationPromise;
      
      this.initializationPromise = (async () => {
        try {
          this.loading = true;
          this.error = null;
          this.auth0client = await auth.createClient();
          
          if (this.auth0client) {
            this.user = await this.auth0client.getUser();
          }
          
          this.initialized = true;
          return this.auth0client;
        } catch (error) {
          this.error = error.message;
          throw error;
        } finally {
          this.loading = false;
          this.initializationPromise = null;
        }
      })();
      
      return this.initializationPromise;
    },
    
    async login() {
      if (typeof window === 'undefined') return;
      if (!this.auth0client) await this.initializeAuth();
      if (!this.auth0client) throw new Error('Auth0 client not initialized');
      
      try {
        this.error = null;
        this.loading = true;
        await auth.loginWithPopup(this.auth0client);
        this.user = await this.auth0client.getUser();
        
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath && typeof window !== 'undefined') {
          sessionStorage.removeItem('redirectAfterLogin');
          const router = this.router || window.app?.config?.globalProperties.$router;
          if (router) {
            setTimeout(() => router.push(redirectPath), 100);
          } else {
            setTimeout(() => window.location.href = redirectPath, 100);
          }
        }
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      if (typeof window === 'undefined') return;
      if (!this.auth0client) return;
      
      try {
        this.error = null;
        this.loading = true;
        await auth.logout(this.auth0client);
        this.user = null;
        
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/';
          }, 100);
        }
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    clearError() {
      this.error = null;
    },
    
    hasRole(role) {
      if (!this.user) return false;
      const userRoles = this.user['https://your-app.com/roles'] || [];
      return userRoles.includes(role);
    },
    
    hasAnyRole(roles) {
      return roles.some(role => this.hasRole(role));
    },
    
    setRouter(router) {
      this.router = router;
    }
  }
}) 