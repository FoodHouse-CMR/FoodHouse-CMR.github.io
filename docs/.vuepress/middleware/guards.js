import { useAuthStore } from '@stores/auth.js'

/**
 * Middleware that requires authentication
 */
export async function requireAuth(to, from, next) {
    console.log('🛡️ requireAuth guard triggered for:', to.path)

    const authStore = useAuthStore()

    // Wait for auth to initialize if it hasn't already
    if (!authStore.initialized) {
        console.log('⏳ Waiting for auth initialization...')
        await authStore.initializeAuth()
    }

    if (authStore.isAuthenticated) {
        console.log('✅ User authenticated, proceeding to:', to.path)
        next()
    } else {
        console.log('❌ User not authenticated')

        // Store the intended destination
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('redirectAfterLogin', to.fullPath)
        }

        // Option 1: Redirect to home with auto-login flag
        if (to.path !== '/') {
            next('/?login=required')
        } else {
            // Option 2: Trigger login immediately if already on home page
            console.log('🚀 Triggering immediate login...')
            try {
                await authStore.login()
                next() // Continue to original route after successful login
            } catch (error) {
                console.error('Immediate login failed:', error)
                next() // Still show the page but with login prompt
            }
        }
    }
}

/**
 * Middleware that requires guest status (not authenticated)
 */
export async function requireGuest(to, from, next) {
    console.log('👤 requireGuest guard triggered for:', to.path)

    const authStore = useAuthStore()

    // Wait for auth to initialize if it hasn't already
    if (!authStore.initialized) {
        console.log('⏳ Waiting for auth initialization...')
        await authStore.initializeAuth()
    }

    if (!authStore.isAuthenticated) {
        console.log('✅ User is guest, proceeding to:', to.path)
        next()
    } else {
        console.log('❌ User is authenticated, redirecting to dashboard')
        next('/dashboard')
    }
}

/**
 * Middleware that requires specific roles
 */
export function requireRole(roles) {
    return async function (to, from, next) {
        console.log('🔐 requireRole guard triggered for:', to.path, 'Required roles:', roles)

        const authStore = useAuthStore()

        // Wait for auth to initialize if it hasn't already
        if (!authStore.initialized) {
            console.log('⏳ Waiting for auth initialization...')
            await authStore.initializeAuth()
        }

        if (!authStore.isAuthenticated) {
            console.log('❌ User not authenticated, redirecting to login')

            // Store the intended destination
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('redirectAfterLogin', to.fullPath)
            }

            next('/?login=required')
            return
        }

        // Check if user has required role
        const userRoles = authStore.user?.['https://your-app.com/roles'] || []
        const hasRequiredRole = Array.isArray(roles)
            ? roles.some(role => userRoles.includes(role))
            : userRoles.includes(roles)

        if (hasRequiredRole) {
            console.log('✅ User has required role, proceeding to:', to.path)
            next()
        } else {
            console.log('❌ User lacks required role, redirecting to unauthorized')
            next('/unauthorized')
        }
    }
}

/**
 * General purpose auth check (doesn't redirect, just checks)
 */
export async function checkAuth(to, from, next) {
    console.log('🔍 checkAuth guard triggered for:', to.path)

    const authStore = useAuthStore()

    // Initialize auth if needed
    if (!authStore.initialized) {
        await authStore.initializeAuth()
    }

    // Always proceed, but auth state is now available
    next()
} 