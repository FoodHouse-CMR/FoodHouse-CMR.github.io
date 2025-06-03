---
home: true
title: Home
heroImage: https://vuejs.press/images/hero.png
actions:
  - text: Get Started
    link: /get-started.html
    type: primary

  - text: Introduction
    link: https://vuejs.press/guide/introduction.html
    type: secondary

features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
  - title: Themes
    details: Providing a default theme out of the box. You can also choose a community theme or create your own one.
  - title: Plugins
    details: Flexible plugin API, allowing plugins to provide lots of plug-and-play features for your site.
  - title: Bundlers
    details: Default bundler is Vite, while Webpack is also supported. Choose the one you like!

footer: MIT Licensed | Copyright © 2018-present VuePress Community
---

This is the content of home page. Check [Home Page Docs][default-theme-home] for more details.

[default-theme-home]: https://vuejs.press/reference/default-theme/frontmatter.html#home-page

<!-- Enhanced login handling with auto-trigger -->
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