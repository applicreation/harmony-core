import {browser} from '$app/env';
import createAuth0Client from "@auth0/auth0-spa-js";
import {isAuthenticating, isChecked, isUser, user, popupOpen} from '$lib/stores/user.js';

const fetchConfig = () => fetch("/config.json");

let client;

async function getClient() {
    if (typeof client !== 'undefined') {
        return client;
    }

    const config = (await (await fetchConfig()).json()).auth || {};
    if (!browser || !config.auth0) {
        isAuthenticating.set(false);

        return client = null;
    }

    return client = await createAuth0Client(config.auth0);
}

async function isAuthenticated() {
    const client = await getClient();

    let authUser;
    if (client !== null) {
        authUser = await client.getUser();
    }

    isUser.set(typeof authUser != 'undefined');
    user.set(authUser);

    isChecked.set(true);
}

async function login(options) {
    const client = await getClient();

    popupOpen.set(true);

    try {
        await client.loginWithPopup(options);

        const authUser = await client.getUser();

        isUser.set(typeof authUser != 'undefined');
        user.set(authUser);
    } finally {
        popupOpen.set(false);
    }
}

async function logout() {
    const client = await getClient();

    isUser.set(false);
    user.set({});

    return client.logout();
}

const auth = {
    isAuthenticated,
    login,
    logout
};

export default auth;
