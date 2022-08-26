import {redirect} from '@sveltejs/kit'

/** @type {import('./$types').LayoutLoad} */
export function load({url}) {
    if (url.pathname.indexOf('.') === -1 && url.pathname.slice(-1) !== '/') {
        const redirectUrl = new URL(url.toString())

        redirectUrl.pathname += '/'

        throw redirect(301, redirectUrl.toString())
    }
}
