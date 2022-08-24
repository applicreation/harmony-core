import google from '$lib/services/google.js'
import {redirect} from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ setHeaders }) {
    if (!await google.isAuthenticating()) {
        setHeaders({
            'set-cookie': 'access_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;'
        })

        setHeaders({
            'set-cookie': 'refresh_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;'
        })

        throw redirect(301, '/')
    }
}
