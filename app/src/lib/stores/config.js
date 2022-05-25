import {browser} from '$app/env';
import {readable} from 'svelte/store';

export default readable({}, (set) => {
    fetch(`${!browser ? 'http://proxy' : ''}/config.json`)
        .then(resp => resp.json())
        .then(data => set(data));

    return () => {};
});
