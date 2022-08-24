import {getConfig} from '$lib/config'

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const config = await getConfig()
    const body = removeSensitive(config)

    return new Response(JSON.stringify({body}))
}

function removeSensitive(obj) {
    for (const prop in obj) {
        if (prop === 'sensitive') {
            delete obj[prop]
        } else if (typeof obj[prop] === 'object') {
            removeSensitive(obj[prop])
        }
    }

    return obj
}
