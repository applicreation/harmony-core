import os from 'os'
import fs from 'fs'
import YAML from 'yaml'
import {browser} from '$app/environment'
import {graphql} from '@octokit/graphql'
import { env } from '$env/dynamic/private'

let config

export async function getConfig() {
    if (config) {
        return config
    }

    try {
        const regex = /\${{[A-Z0-9_]+}}/g

        let file = fs.readFileSync(os.homedir() + '/.harmony/config/main.yaml', 'utf8')
        for (const match of file.match(regex)) {
            file = file.replace(match, process.env[match.slice(3, -2)] || null)
        }

        config = YAML.parse(file)

        const ids = []
        for (const module of Object.values(config.modules || {})) {
            const id = module.id || null
            if (id !== null && ids.indexOf(module.id) === -1) {
                ids.push(module.id)
            }
        }

        const modules = {}
        for (const id of ids) {
            modules[id] = await getConfigModule(id)
        }

        config.modules = modules
    } catch {
        return {}
    }

    return config
}

async function getConfigModule(id) {
    const url = `${!browser ? 'http://proxy' : ''}/module/${id}/harmony.json`
    const options = {headers: {'User-Agent': 'harmony-core'}}

    let json

    try {
        const response = await fetch(url, options)

        json = response.ok ? await response.json() : {}
    } catch {
        json = {}
    }


    const configModule = {
        _computed: {
            id,
            url: {
                core: '/modules/' + id,
                module: '/module/' + id,
            },
            version: await getVersionDetails(id, json.version || '')
        },
    }

    return {...configModule, ...json}
}

async function getVersionDetails(repoName, version) {
    const repo = await getVersionRepo(repoName)
    const release = formatVersion(repo.release)
    const config = formatVersion(repo.config)
    const deployed = formatVersion(version)


    const upgrade = determineUpgrade(release, config, deployed)

    return {
        upgrade,
        deployed,
        release,
    }
}

async function getVersionRepo(repo) {
    try {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${env.GITHUB_TOKEN}`,
            },
        });

        const {repository} = await graphqlWithAuth(`
            {
                repository(name: "harmony-module-${repo}", owner: "applicreation") {
                    id
                    releases(last: 1) {
                        totalCount
                        nodes {
                            name
                        }
                    }
                    object(expression: "main:app/harmony.json") {
                        ... on Blob {
                            text
                        }
                    }
                }
            }
        `);

        let json = {}
        if (repository.object !== null) {
            json = JSON.parse(repository.object.text || '')
        }

        return {
            release: (((repository.releases || {}).nodes || [])[0] || {}).name || '',
            config: json.version,
        }
    } catch {
        return {
            release: '',
            config: '',
        }
    }
}

function determineUpgrade(release, config, deployed) {
    if (release.major === null || release.minor === null || release.patch === null) {
        return 'unknown'
    }

    if (config.major === null || config.minor === null || config.patch === null) {
        return 'unknown'
    }

    if (deployed.major === null || deployed.minor === null || deployed.patch === null) {
        return 'unknown'
    }

    if (JSON.stringify(release) !== JSON.stringify(config)) {
        return 'misconfigured'
    } else if (release.major > deployed.major) {
        return 'major'
    } else if (release.minor > deployed.minor) {
        return 'minor'
    } else if (release.patch > deployed.patch) {
        return 'patch'
    }

    return null
}

function formatVersion(version) {
    const regex = /^v[0-9+]\.[0-9+]\.[0-9+]$/g

    if (!version.match(regex)) {
        return {
            major: null,
            minor: null,
            patch: null,
        }
    }

    let [major, minor, patch] = version.replace('v', '').split('.', 3)

    return {
        major: parseInt(major),
        minor: parseInt(minor),
        patch: parseInt(patch),
    }
}
