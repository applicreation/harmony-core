import os from 'os'
import fs from 'fs'
import YAML from 'yaml'
import {browser} from '$app/env'

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
            const configModule = {
                urlCore: '/modules/' + id,
                urlModule: '/module/' + id,
                name: id,
                description: null,
            }

            const url = `${!browser ? 'http://proxy' : ''}${configModule.urlModule}/module.json`
            const options = {headers: {'User-Agent': 'harmony-core'}}

            const response = await fetch(url, options)
            const json = response.ok ? await response.json() : {}

            modules[id] = {...configModule, ...json}
        }

        config.modules = modules
    } catch {
        return {}
    }

    return config
}
