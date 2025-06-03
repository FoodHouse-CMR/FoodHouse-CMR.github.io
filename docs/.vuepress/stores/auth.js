import { defineStore } from 'pinia'
import auth from '../auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth0client: null,
    loading: true, // Start with loading true
    error: null,
    initialized: false,
    initializationPromise: null,
    router: null,
    // Add a flag to track if we're in the initial hydration phase
    isHydrating: true
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => {
      if (!state.user) return 'Guest'
      return state.user.name || state.user.given_name || 'User'
    },
    userEmail: (state) => state.user?.email || '',
    isLoading: (state) => state.loading || state.isHydrating, // Include hydration state in loading
    hasError: (state) => !!state.error,
    isInitialized: (state) => state.initialized
  },

  actions: {
    async initializeAuth() {
      // If already initialized, return the client
      if (this.initialized) return this.auth0client;

      // If initialization is in progress, wait for it
      if (this.initializationPromise) return this.initializationPromise;

      this.initializationPromise = (async () => {
        try {
          this.loading = true;
          this.error = null;

          // Wait for environment variables to be available
          if (!auth.config.domain || !auth.config.clientId) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          this.auth0client = await auth.createClient();

          if (this.auth0client) {
            // Check if we're in the middle of an auth callback
            const isAuthenticated = await this.auth0client.isAuthenticated();
            if (isAuthenticated) {
              this.user = await this.auth0client.getUser();
            }
          }

          this.initialized = true;
          return this.auth0client;
        } catch (error) {
          console.error('Auth initialization error:', error);
          this.error = error.message;
        } finally {
          this.loading = false;
          this.initializationPromise = null;
          // Mark hydration as complete after ensuring DOM is ready
          if (typeof window !== 'undefined') {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
              this.isHydrating = false;
            });
          }
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

        // Handle redirect after login
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath && typeof window !== 'undefined') {
          sessionStorage.removeItem('redirectAfterLogin');
          this.redirectTo(redirectPath);
        } else {
          this.redirectTo('/dashboard');
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
    },

    // Single method to handle all redirects
    redirectTo(path) {
      if (typeof window === 'undefined') return;
      window.location.href = path;
    },

    // Method to handle auth redirects
    redirectToLogin(returnPath) {
      if (typeof window === 'undefined') return;
      sessionStorage.setItem('redirectAfterLogin', returnPath);
      this.redirectTo('/?login=required');
    }
  }
})