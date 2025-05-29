<template>
  <div class="main-content">
    <!-- Show auto-login message -->
    <div v-if="showAutoLoginMessage" class="auto-login-message">
      <p align="center">🔐 Authentication required. Automatically opening login...</p>
      <div class="loading-spinner"></div>
    </div>
    
    <div v-else-if="authStore.loading">
      <p align="center">⏳ Loading...</p>
    </div>
    <div v-else-if="authStore.error">
      <p align="center" style="color: red;">❌ Error: {{ authStore.error }}</p>
      <p align="center">
        <button @click="authStore.clearError()" class="retry-button">
          Clear Error
        </button>
        <button @click="authStore.initializeAuth()" class="retry-button">
          Retry
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
      <p>Auto-login: {{ showAutoLoginMessage ? '🚀 Active' : '✅ None' }}</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'
import { ref, onMounted } from 'vue'

export default {
  name: 'AuthLayout',
  setup() {
    const authStore = useAuthStore()
    const showAutoLoginMessage = ref(false)
    
    onMounted(() => {
      // Check if this is an auto-login scenario
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('login') === 'required') {
        showAutoLoginMessage.value = true

        authStore.autoLogin()
        // Hide the message after a timeout (in case login fails or is cancelled)
        setTimeout(() => {
          showAutoLoginMessage.value = false
        }, 10000) // 10 seconds timeout
      }
    })
    
    return {
      authStore,
      showAutoLoginMessage,
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

.auto-login-message {
  text-align: center;
  padding: 20px;
  background-color: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 4px;
  margin-bottom: 20px;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-top: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.retry-button:hover {
  background-color: #5a6268;
}
</style>