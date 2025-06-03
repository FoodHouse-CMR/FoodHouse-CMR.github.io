<template>
  <div class="auth-nav">
    <!-- Login Button when not authenticated -->
    <button 
      v-if="!isAuthenticated" 
      @click="handleLogin" 
      class="vp-button vp-button--primary"
      :disabled="authStore.loading"
    >
      Login
    </button>

    <!-- User Avatar and Dropdown when authenticated -->
    <div v-else class="user-dropdown">
      <button 
        @click="toggleDropdown" 
        class="avatar-button"
        :class="{ 'is-active': isDropdownOpen }"
      >
        <img 
          :src="userPicture" 
          :alt="userName"
          class="user-avatar"
        />
      </button>

      <!-- Dropdown Menu -->
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <div class="user-info">
          <img 
            :src="userPicture" 
            :alt="userName"
            class="user-avatar-large"
          />
          <div class="user-details">
            <div class="user-name">{{ userName }}</div>
            <div class="user-email">{{ userEmail }}</div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <button 
          @click="handleLogout" 
          class="vp-button vp-button--danger dropdown-item"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'
import { computed, ref } from 'vue'

export default {
  name: 'AuthNav',
  setup() {
    const authStore = useAuthStore()
    const isDropdownOpen = ref(false)
    
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const userPicture = computed(() => authStore.user?.picture || '')
    const userName = computed(() => authStore.user?.name || '')
    const userEmail = computed(() => authStore.user?.email || '')
    
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const handleLogin = async () => {
      try {
        await authStore.login()
      } catch (error) {
        console.error('Login error:', error)
      }
    }
    
    const handleLogout = async () => {
      try {
        await authStore.logout()
        isDropdownOpen.value = false
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.user-dropdown')
      if (dropdown && !dropdown.contains(event.target)) {
        isDropdownOpen.value = false
      }
    }

    // Add click outside listener
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside)
    }
    
    return {
      authStore,
      isAuthenticated,
      isDropdownOpen,
      userPicture,
      userName,
      userEmail,
      toggleDropdown,
      handleLogin,
      handleLogout
    }
  }
}
</script>

<style scoped>
.auth-nav {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

/* Login Button Styles */
.vp-button--primary {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: #007bff;
  color: white;
}

.vp-button--primary:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vp-button--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* User Dropdown Styles */
.user-dropdown {
  position: relative;
  display: flex;
  justify-content: center;
}

.avatar-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-button.is-active {
  box-shadow: 0 0 0 2px var(--vp-c-brand);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  z-index: 100;
  animation: dropdownFadeIn 0.2s ease;
  overflow: hidden;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-info {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--vp-c-bg);
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 500;
  font-size: 0.95em;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-divider {
  height: 1px;
  background: var(--vp-c-border);
  margin: 0;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s ease;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background-color: var(--vp-c-bg-soft);
}

/* Logout Button Specific Styles */
.vp-button--danger {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.vp-button--danger:hover {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>