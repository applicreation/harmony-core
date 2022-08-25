import {redirect} from '@sveltejs/kit'
import google from '$lib/services/google.js'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ setHeaders }) {
    if (!await google.isAuthenticating()) {
        setHeaders({
            'Cache-Control': 'no-store',
        })

        setHeaders({
            'set-cookie': 'access_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;'
        })

        setHeaders({
            'set-cookie': 'refresh_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;'
        })

        throw redirect(301, '/')
    }
}
