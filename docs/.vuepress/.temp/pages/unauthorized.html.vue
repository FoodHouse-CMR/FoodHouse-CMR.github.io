<template><div><h1 id="unauthorized-access" tabindex="-1"><a class="header-anchor" href="#unauthorized-access"><span>Unauthorized Access</span></a></h1>
<p>You don't have permission to access the requested page.</p>
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
</div></template>

<script>
import { useAuthStore } from '@stores/auth.js'

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