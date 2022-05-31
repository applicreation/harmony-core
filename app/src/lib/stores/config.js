import {browser} from '$app/env';
import {readable} from 'svelte/store';

export default readable({}, (set) => {
    const url = `${!browser ? 'http://proxy' : ''}/config.json`;
    const options = {headers: {'User-Agent': 'harmony-core'}};

    fetch(url, options)
        .then(resp => resp.json())
        .then(data => set(data));

    return () => {};
});
