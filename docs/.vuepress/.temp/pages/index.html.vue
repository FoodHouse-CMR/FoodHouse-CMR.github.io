<template><div><p>This is the content of home page. Check <a href="https://vuejs.press/reference/default-theme/frontmatter.html#home-page" target="_blank" rel="noopener noreferrer">Home Page Docs</a> for more details.</p>
<!-- Enhanced login handling with auto-trigger -->
</div></template>

<script>
import { useAuthStore } from '@stores/auth.js'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const authStore = useAuthStore()
    const loginTriggered = ref(false)
    
    onMounted(async () => {
      // Check if user was redirected here for login
      const urlParams = new URLSearchParams(window.location.search)
      const loginRequired = urlParams.get('login') === 'required'
      
      if (loginRequired) {
        console.log('🔐 User redirected for authentication')
        
        // Clear the URL parameter immediately
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
        
        // Wait for auth to initialize if needed
        if (!authStore.initialized) {
          console.log('⏳ Waiting for auth initialization before auto-login...')
          await authStore.initializeAuth()
        }
        
        // Only auto-trigger if user is not already authenticated
        if (!authStore.isAuthenticated && !loginTriggered.value) {
          loginTriggered.value = true
          console.log('🚀 Auto-triggering login popup...')
          
          try {
            // Small delay to ensure page is fully loaded
            setTimeout(async () => {
              await authStore.login()
            }, 500)
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
