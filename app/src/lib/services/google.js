import {OAuth2Client} from 'google-auth-library'
import {getConfig} from '$lib/config'

async function getClient() {
    const config = await getConfig() || {}
    const configAuth = config.auth || {}
    const configAuthClients = configAuth.clients || {}
    const configAuthClientsGoogle = configAuthClients.google || {}

    if (!configAuthClientsGoogle.client_id || !configAuthClientsGoogle.client_secret || !config.base_url) {
        return null
    }

    return new OAuth2Client(
        configAuthClientsGoogle.client_id,
        configAuthClientsGoogle.client_secret,
        config.base_url + '/auth/google/callback/',
    )
}

async function isAuthenticating() {
    return await getClient() !== null
}

async function isAuthenticated(accessToken) {
    const client = await getClient()

    try {
        await client.getTokenInfo(accessToken)
    } catch (e) {
        console.error(e)
        return false
    }

    return true
}

async function getToken(code) {
    return (await (await getClient()).getToken(code)).tokens
}

async function signIn() {
    const client = await getClient()

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
    ]

    return client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    })
}

async function signOut(accessToken) {
    await (await getClient()).revokeToken(accessToken)
}

async function refresh(refreshToken) {
    const client = await getClient()

    client.setCredentials({refresh_token: refreshToken})

    try {
        return (await client.refreshAccessToken()).credentials
    } catch {
        return {}
    }
}

export default {
    isAuthenticating,
    isAuthenticated,
    getToken,
    signIn,
    signOut,
    refresh,
}
