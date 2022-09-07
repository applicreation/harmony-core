/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
    event.locals.token = event.cookies.get('harmony_token')

    return await resolve(event)
}
