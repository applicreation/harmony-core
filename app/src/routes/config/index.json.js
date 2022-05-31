import {browser} from '$app/env';
import os from 'os';
import fs from 'fs';
import YAML from 'yaml';

export async function get() {
    let body = {};
    try {
        body = YAML.parse(await fs.promises.readFile(os.homedir() + '/.harmony/config/main.yaml', 'utf8'));
    } catch {
        body = {};
    }

    const ids = [];
    for (const module of Object.values(body.modules || {})) {
        const id = module.id || null;
        if (id !== null && ids.indexOf(module.id) === -1) {
            ids.push(module.id);
        }
    }

    const modules = {};
    for (const id of ids) {
        const config = {
            urlCore: '/' + id,
            urlModule: '/module/' + id,
            name: id,
            description: null,
        };

        const url = `${!browser ? 'http://proxy' : ''}${config.urlModule}/module.json`;
        const options = {headers: {'User-Agent': 'harmony-core'}};

        const response = await fetch(url, options);
        const json = response.ok ? await response.json() : {};

        modules[id] = {...config, ...json}
    }

    body.modules = modules;

    return {body};
}
