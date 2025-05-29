<template><div><h1 id="dashboard" tabindex="-1"><a class="header-anchor" href="#dashboard"><span>Dashboard</span></a></h1>
<p>Welcome to your protected dashboard!</p>
<UserProfile /><h2 id="quick-actions" tabindex="-1"><a class="header-anchor" href="#quick-actions"><span>Quick Actions</span></a></h2>
<ul>
<li><a href="/profile">View Profile</a></li>
<li><a href="/settings">Settings</a></li>
<li><a href="/admin">Admin Panel</a> (Admin only)</li>
</ul>
</div></template>

<script>
import { useAuthStore } from './.vuepress/stores/auth.js'

export default {
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  }
}
</script>
