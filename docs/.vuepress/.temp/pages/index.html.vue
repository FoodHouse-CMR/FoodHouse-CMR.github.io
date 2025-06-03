<template><div><!-- Enhanced login handling with auto-trigger -->
</div></template>

<script>
import { useAuthStore } from '@stores/auth.js'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const authStore = useAuthStore()
    const loginTriggered = ref(false)
    
    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const loginRequired = urlParams.get('login') === 'required'
      
      if (loginRequired) {
        // Clear the URL parameter immediately
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
        
        if (!authStore.isAuthenticated && !loginTriggered.value) {
          loginTriggered.value = true
          try {
            await authStore.login()
          } catch (error) {
            console.error('Auto-login failed:', error)
            loginTriggered.value = false
          }
        }
      }
    })
    
    return {
      authStore,
      loginTriggered
    }
  }
}
</script>
