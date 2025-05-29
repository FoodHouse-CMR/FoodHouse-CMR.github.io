import { requireAuth, requireGuest, requireRole } from '@middleware/guards.js'

/**
 * Route-based guards configuration
 * Maps route patterns to middleware functions
 */
export const routeGuards = {
  // Exact path matches
  '/dashboard': requireAuth,
  '/profile': requireAuth,
  '/settings': requireAuth,
  '/get-started/*': requireAuth,
  
  // Wildcard path matches
  '/admin/*': requireRole(['admin']),
  '/moderate/*': requireRole(['moderator', 'admin']),
  '/user/*': requireAuth,
  
  // Guest-only routes
  '/login': requireGuest,
  '/register': requireGuest,
}

/**
 * Get the appropriate guard for a given route
 */
export function getRouteGuard(path) {
  // Check exact match first
  if (routeGuards[path]) {
    return routeGuards[path]
  }
  
  // Check wildcard matches
  for (const [route, guard] of Object.entries(routeGuards)) {
    if (route.endsWith('/*')) {
      const basePath = route.slice(0, -2)
      if (path.startsWith(basePath)) {
        return guard
      }
    }
  }
  
  return null
} 