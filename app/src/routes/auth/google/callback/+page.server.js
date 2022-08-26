import {redirect} from '@sveltejs/kit'
import google from '$lib/services/google.js'

/** @type {import('./$types').PageServerLoad} */
export async function load({url, setHeaders}) {
    console.log('callback +page.server.js')

    setHeaders({
        'Cache-Control': 'no-store',
    })

    const code = url.searchParams.get('code')
    if (!code) {
        throw redirect(302, '/auth')
    }

    let accessToken, refreshToken, expires

    try {
        const tokens = await google.getToken(code)

        accessToken = tokens.access_token
        refreshToken = tokens.refresh_token
        expires = new Date(tokens.expiry_date)
    } catch {
        throw redirect(302, '/auth')
    }

    if (!accessToken || !expires) {
        throw redirect(302, '/auth')
    }

    if (refreshToken) {
        setHeaders({
            'set-cookie': 'refresh_token=' + refreshToken + '; Path=/; Secure; HttpOnly;'
        })
    }

    setHeaders({
        'set-cookie': 'access_token=' + accessToken + '; Expires=' + expires.toUTCString() + '; Path=/; Secure; HttpOnly;'
    })

    throw redirect(302, '/')
}
