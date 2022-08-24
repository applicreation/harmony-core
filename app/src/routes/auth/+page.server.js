import google from '$lib/services/google.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        signIn: google.signIn()
    };
}
