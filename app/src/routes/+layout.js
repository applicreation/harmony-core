import {redirect} from '@sveltejs/kit'

/** @type {import('./$types').LayoutLoad} */
export function load({url}) {
    if (url.pathname.indexOf('.') === -1 && url.pathname.slice(-1) !== '/') {
        throw redirect(301, url.pathname + '/' + url.search)
    }
}
