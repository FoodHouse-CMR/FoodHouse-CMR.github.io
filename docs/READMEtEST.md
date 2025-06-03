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

@startuml
participant Participant as Foo
actor       Actor       as Foo1
boundary    Boundary    as Foo2
control     Control     as Foo3
entity      Entity      as Foo4
database    Database    as Foo5
collections Collections as Foo6
queue       Queue       as Foo7
Foo -> Foo1 : To actor 
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
@enduml



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