import {browser} from '$app/environment'

/** @type {import('./$types').LayoutLoad} */
export async function load({data, fetch}) {
    const url = `${!browser ? 'http://proxy' : ''}/auth/`
    const options = {
        headers: {
            'Authorization': 'Bearer ' + data.token,
            'User-Agent': 'harmony-core',
        },
    }

    let isAuthenticated

    try {
        const response = await fetch(url, options)
        const json = await response.json()

        isAuthenticated = json.type === 'guest' ? -1 : response.status
    } catch {
        isAuthenticated = 401
    }

    return {
        googleClientId: data.googleClientId,
        isAuthenticated,
        modules: data.modules,
    }
}
