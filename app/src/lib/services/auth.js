import createAuth0Client from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from '$lib/stores/user.js';

const fetchAuthConfig = () => fetch("/config.json");

async function createClient() {
    const response = await fetchAuthConfig();
    const config = await response.json();

    let auth0Client = await createAuth0Client(config.auth.auth0);

    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;
