import { createAuth0Client } from "@auth0/auth0-spa-js";

async function createClient() {
  try {
    let auth0Client = await createAuth0Client({
      domain: "dev-u2nuf4qnpgxwrc0x.us.auth0.com",
      clientId: "gflY16eZTriweM1HfDSq6PKCBqOteBUc",
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      // Enable caching for better performance
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    });

    return auth0Client;
  } catch (error) {
    console.error('Failed to create Auth0 client:', error);
    throw error;
  }
}

async function loginWithPopup(client, options = {}) {
  try {
    await client.loginWithPopup(options);
  } catch (e) {
    console.error('Login error:', e);
    throw e;
  }
}

async function logout(client) {
  try {
    await client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  } catch (e) {
    console.error('Logout error:', e);
    throw e;
  }
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;