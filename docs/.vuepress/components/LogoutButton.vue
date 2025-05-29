<template>
    <button @click="handleLogout" class="auth-button logout-button">
        Log Out
    </button>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
    name: 'LogoutButton',
    setup() {
        const authStore = useAuthStore()
        
        const handleLogout = async () => {
            try {
                await authStore.logout()
            } catch (error) {
                console.error('Logout button error:', error)
            }
        }
        
        return {
            authStore,
            handleLogout
        }
    }
}
</script>

<style scoped>
.auth-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
}

.logout-button {
    background-color: #dc3545;
    color: white;
}

.logout-button:hover {
    background-color: #c82333;
}
</style>