<template>
    <button 
        @click="handleLogin" 
        class="auth-button login-button" 
        :disabled="authStore.loading"
    >
        {{ authStore.loading ? 'Logging in...' : 'Login' }}
    </button>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
    name: 'LoginButton',
    setup() {
        const authStore = useAuthStore()
        
        const handleLogin = async () => {
            try {
                await authStore.login()
            } catch (error) {
                console.error('Login button error:', error)
            }
        }
        
        return {
            authStore,
            handleLogin
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

.login-button {
    background-color: #007bff;
    color: white;
}

.login-button:hover:not(:disabled) {
    background-color: #0056b3;
}

.login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>