import {redirect} from '@sveltejs/kit'
import {getConfig} from '$lib/config'
import google from '$lib/services/google.js'
import cookie from 'cookie'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({request, setHeaders}) {
    const config = await getConfig()
    const isAuthenticating = await google.isAuthenticating()

    if (isAuthenticating) {
        setHeaders({
            'Cache-Control': 'no-store',
        })

        const cookies = cookie.parse(request.headers.get('cookie') || '')

        let isAuthenticated = cookies.access_token && await google.isAuthenticated(cookies.access_token)

        if (!isAuthenticated && cookies.refresh_token) {
            const tokens = await google.refresh(cookies.refresh_token)

            if (tokens.access_token) {
                const expires = new Date(tokens.expiry_date)

                isAuthenticated = await google.isAuthenticated(tokens.access_token)

                setHeaders({
                    'set-cookie': 'access_token=' + tokens.access_token + '; Expires=' + expires.toUTCString() + '; Path=/; Secure; HttpOnly;'
                })
            }
        }

        if (!isAuthenticated) {
            setHeaders({
                'set-cookie': 'access_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;',
            })

            setHeaders({
                'set-cookie': 'refresh_token=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;',
            })

            throw redirect(301, '/auth')
        }
    }

    return {
        isAuthenticating,
        modules: config.modules || {}
    }
}
