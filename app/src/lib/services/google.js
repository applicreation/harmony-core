import {OAuth2Client} from 'google-auth-library'
import {getConfig} from '$lib/config'

async function getConfigAuth() {
    return (await getConfig() || {}).auth || {}
}

async function getClient() {
    const configAuthGoogle = (await getConfigAuth()).google || {}

    if (!configAuthGoogle.client_id || !configAuthGoogle.sensitive.client_secret) {
        return null
    }

    return new OAuth2Client(
        configAuthGoogle.client_id,
        configAuthGoogle.sensitive.client_secret,
        'http://localhost/auth/google/callback',
    )
}

async function isAuthenticating() {
    return await getClient() !== null
}

async function isAuthenticated(accessToken) {
    const client = await getClient()

    try {
        const tokenInfo = await client.getTokenInfo(accessToken)
        console.log('tokenInfo', tokenInfo)
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

    return (await client.refreshAccessToken()).credentials
}

export default {
    isAuthenticating,
    isAuthenticated,
    getToken,
    signIn,
    signOut,
    refresh,
}
