import {browser} from '$app/env';
import createAuth0Client from "@auth0/auth0-spa-js";
import {isChecked, isUser, user, popupOpen} from '$lib/stores/user.js';

const fetchConfig = () => fetch("/config.json");

let client;

async function getClient() {
    if (typeof client !== 'undefined') return client;
    if (!browser) return client = {getUser: () => {}, loginWithPopup: () => {}, logout: () => {}};

    const config = await (await fetchConfig()).json();

    return client = await createAuth0Client(config.auth.auth0);
}

async function isAuthenticated() {
    const client = await getClient();
    const authUser = await client.getUser();

    isUser.set(typeof authUser != 'undefined');
    user.set(authUser);

    isChecked.set(true);
}

async function login(options) {
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

function logout() {
    return client.logout();
}

const auth = {
    isAuthenticated,
    login,
    logout
};

export default auth;
