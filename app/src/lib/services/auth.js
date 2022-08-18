import {browser} from '$app/env';
import createAuth0Client from "@auth0/auth0-spa-js";
import {isAuthenticating, isChecked, isUser, isAllowed, user, popupOpen} from '$lib/stores/user.js';

const fetchConfig = () => fetch("/config.json");

let config, client;

async function getClient() {
    if (typeof client !== 'undefined') {
        return client;
    }

    config = (await (await fetchConfig()).json()).auth || {};
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

    if (typeof authUser != 'undefined') {
        isUser.set(true);

        const domains = (config.constraints || {}).domain || []
        const domain = authUser.email.substring(authUser.email.indexOf('@')+1)

        isAllowed.set(domains.length <= 0 || domains.indexOf(domain) >= 0);
    }

    user.set(authUser);

    isChecked.set(true);
}

async function login(options) {
    const client = await getClient();

    popupOpen.set(true);

    try {
        await client.loginWithPopup(options);

        const authUser = await client.getUser();

        if (typeof authUser != 'undefined') {
            isUser.set(true);

            const domains = (config.constraints || {}).domain || []
            const domain = authUser.email.substring(authUser.email.indexOf('@')+1)

            isAllowed.set(domains.length <= 0 || domains.indexOf(domain) >= 0);
        }

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
