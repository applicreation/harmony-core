import {error, json} from '@sveltejs/kit'
import {OAuth2Client} from 'google-auth-library'
import jsonwebtoken from 'jsonwebtoken'
import {getConfig} from '$lib/config'

const { verify, sign } = jsonwebtoken

const COOKIE_NAME = 'harmony_token'

/** @type {import('./$types').RequestHandler} */
export async function GET({request}) {
    const config = await getConfig()
    if (!config.auth._computed.isAuthenticating) {
        return json({
            type: 'guest'
        })
    }

    const token = (request.headers.get('authorization') || '').replace('Bearer', '').trim()
    if (token.length <= 0) {
        throw error(401, 'Token not found')
    }

    try {
        const tokenSecret = getTokenSecret(config)
        const response = verify(token, tokenSecret)

        return json({
            ...{
                type: 'user'
            },
            ...response,
        })
    } catch {
        throw error(401, 'Token not verified')
    }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({request, setHeaders}) {
    const body = await request.json() || {}
    const credential = body.credential || null
    if (credential === null) {
        throw error(400)
    }

    const config = await getConfig()
    const clientId = getGoogleClientId(config)
    if (clientId === null) {
        throw error(400)
    }

    const client = new OAuth2Client(clientId)

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });

    const tokenSecret = getTokenSecret(config)
    const token = sign({
        name: ticket.getPayload().name,
        email: ticket.getPayload().email,
        picture: ticket.getPayload().picture,
    }, tokenSecret)

    let tokenTtl = getTokenTtl(config)
    if (tokenTtl !== null) {
        tokenTtl = 'Max-Age=' + tokenTtl + '; '
    }

    setHeaders({
        'set-cookie': COOKIE_NAME + '=' + token + ';' + tokenTtl + ' Path=/; Secure; HttpOnly;'
    })

    return json({
        token,
    })
}

/** @type {import('./$types').RequestHandler} */
export function DELETE({setHeaders}) {
    setHeaders({
        'set-cookie': COOKIE_NAME + '=; Expires=' + (new Date()).toUTCString() + '; Path=/; Secure; HttpOnly;'
    })

    return json(null)
}

function getGoogleClientId(config) {
    const configAuth = config.auth || {}
    const configAuthGoogle = configAuth.google || {}

    return configAuthGoogle.client_id || null
}

function getTokenSecret(config) {
    const configAuth = config.auth || {}

    return configAuth.token_secret || null
}

function getTokenTtl(config) {
    const configAuth = config.auth || {}

    return configAuth.token_ttl || null
}
