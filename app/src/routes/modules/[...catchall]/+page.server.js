import {getConfig} from '$lib/config'

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const config = await getConfig()
    const modules = config.modules || {}
    const module = params.catchall.split('/')[0]

    return {
        module: modules[module] || {}
    }
}
