<script context="module">
    import {browser} from '$app/env';

    /** @type {import('./__types/[slug]').Load} */
    export async function load({params, fetch}) {
        const url = `${!browser ? 'http://proxy' : ''}/module/${params.catchall}/`;
        const options = {headers: {'User-Agent': 'harmony-core'}};

        const response = await fetch(url, options);

        return {
            status: response.status,
            props: {
                html: await response.text(),
            }
        };
    }
</script>

<script>
    export let html;
</script>

{@html html}
