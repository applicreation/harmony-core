import {browser} from '$app/env'

/** @type {import('./$types').PageLoad} */
export async function load({params, fetch}) {
    const url = `${!browser ? 'http://proxy' : ''}/module/${params.catchall}`
    const options = {headers: {'User-Agent': 'harmony-core'}}

    let base = params.catchall
    if (base.indexOf('.') > 0) {
        base = base.substring(0, base.indexOf('/'))
    }

    const response = await fetch(url, options)

    let html = await response.text()
    if (response.status !== 200) {
        html = '<div class="p-3"><h1>' + response.status + '</h1><h2>' + response.statusText + '</h2></div>'
    }

    return {
        base,
        html
    }
}
