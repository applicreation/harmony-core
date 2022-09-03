import {getConfig} from '$lib/config'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({locals}) {
    const config = await getConfig()

    return {
        googleClientId: getGoogleClientId(config),
        token: locals.token,
        modules: config.modules || {},
    }
}

async function getGoogleClientId(config) {
    const configAuth = config.auth || {}
    const configAuthGoogle = configAuth.google || {}

    return configAuthGoogle.client_id || null
}
