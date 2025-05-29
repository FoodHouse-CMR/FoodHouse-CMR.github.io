<template><div><h1 id="user-profile" tabindex="-1"><a class="header-anchor" href="#user-profile"><span>User Profile</span></a></h1>
<UserProfile /><div v-if="authStore.user">
  <h2>User Details</h2>
  <pre>{{ JSON.stringify(authStore.user, null, 2) }}</pre>
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
