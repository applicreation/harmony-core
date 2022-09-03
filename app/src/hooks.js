import cookie from 'cookie'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')

    event.locals.token = cookies.harmony_token || null

    return await resolve(event)
}
