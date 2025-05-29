<template><div><h1 id="admin-panel" tabindex="-1"><a class="header-anchor" href="#admin-panel"><span>Admin Panel</span></a></h1>
<p>This page is only accessible to administrators.</p>
<div v-if="authStore.hasRole('admin')">
  <h2>Admin Controls</h2>
  <p>Welcome, admin {{ authStore.userName }}!</p>
  <!-- Admin-specific content here -->
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
