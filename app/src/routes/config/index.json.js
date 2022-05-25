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

    return {body};
}
