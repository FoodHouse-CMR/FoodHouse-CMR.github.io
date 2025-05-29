<template><div><h1 id="dashboard" tabindex="-1"><a class="header-anchor" href="#dashboard"><span>Dashboard</span></a></h1>
<div v-if="authStore.loading">
  ⏳ Loading authentication...
</div>
<div v-else-if="authStore.error">
  ❌ Auth Error: {{ authStore.error }}
  <br>
  <button @click="authStore.initializeAuth(true)">Retry</button>
</div>
<div v-else-if="!authStore.isAuthenticated">
  🚨 **SECURITY ISSUE**: You should NOT see this message!
  <br>
  The auth guards failed to protect this page.
  <br>
  <LoginButton />
</div>
<div v-else>
  ✅ Welcome to your protected dashboard, {{ authStore.userName }}!
<UserProfile /><h2 id="quick-actions" tabindex="-1"><a class="header-anchor" href="#quick-actions"><span>Quick Actions</span></a></h2>
<ul>
<li><a href="/profile">View Profile</a></li>
<li><a href="/settings">Settings</a></li>
<li><a href="/admin">Admin Panel</a> (Admin only)</li>
</ul>
</div>
<h2 id="debug-information" tabindex="-1"><a class="header-anchor" href="#debug-information"><span>Debug Information</span></a></h2>
<details>
<summary>Click to see auth debug info</summary>
<ul>
<li><strong>Authenticated</strong>: {{ authStore.isAuthenticated }}</li>
<li><strong>User</strong>: {{ authStore.user?.name || 'None' }}</li>
<li><strong>Email</strong>: {{ authStore.user?.email || 'None' }}</li>
<li><strong>Loading</strong>: {{ authStore.loading }}</li>
<li><strong>Error</strong>: {{ authStore.error || 'None' }}</li>
<li><strong>Initialized</strong>: {{ authStore.initialized }}</li>
</ul>
</details>
</div></template>

<script>
import { useAuthStore } from '@stores/auth.js'
import { onMounted } from 'vue'

export default {
  setup() {
    const authStore = useAuthStore()
    
    onMounted(() => {
      console.log('📊 Dashboard mounted. Auth state:', {
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
        loading: authStore.loading,
        error: authStore.error,
        initialized: authStore.initialized
      })
      
      // If not authenticated, this is a security issue
      if (!authStore.isAuthenticated && !authStore.loading) {
        console.error('🚨 SECURITY ISSUE: Dashboard loaded without authentication!')
      }
    })
    
    return {
      authStore
    }
  }
}
</script>
