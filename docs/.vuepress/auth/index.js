import { createAuth0Client } from "@auth0/auth0-spa-js";

// Configuration with fallbacks for development
const config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
};

// Initialize auth client with retry mechanism
async function createClient(retries = 3) {
  if (typeof window === 'undefined') return null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
          redirect_uri: config.redirectUri
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true
      });
      return auth0Client;
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`Failed to create Auth0 client after ${retries} attempts`);
      }
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// Enhanced login with popup
async function loginWithPopup(client, options = {}) {
  if (!client) {
    throw new Error('Auth0 client not initialized');
  }

  try {
    await client.loginWithPopup(options);
  } catch (error) {
    if (error.error === 'popup_closed_by_user') {
      throw new Error('Login was cancelled by user');
    } else if (error.error === 'timeout') {
      throw new Error('Login timed out. Please try again.');
    }
    throw new Error('Login failed');
  }
}

// Enhanced logout
async function logout(client) {
  if (!client) {
    throw new Error('Auth0 client not initialized');
  }

  try {
    await client.logout({
      logoutParams: {
        returnTo: config.redirectUri
      }
    });
  } catch (error) {
    throw new Error('Logout failed');
  }
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
  config // Export config for use in other parts of the application
};

export default auth;