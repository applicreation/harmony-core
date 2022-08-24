import {redirect} from '@sveltejs/kit'
import google from '$lib/services/google.js'
import cookie from 'cookie'

/** @type {import('./$types').PageServerLoad} */
export async function load({request, setHeaders}) {
    const cookies = cookie.parse(request.headers.get('cookie') || '')

    if (cookies.access_token) {
        await google.signOut(cookies.access_token)
    }

    setHeaders({
        'set-cookie': 'access_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;',
    })

    setHeaders({
        'set-cookie': 'refresh_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;',
    })

    throw redirect(301, '/');
}
