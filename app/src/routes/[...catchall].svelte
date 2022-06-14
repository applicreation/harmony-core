<script context="module">
    import {browser} from '$app/env';

    /** @type {import('./__types/[slug]').Load} */
    export async function load({params, fetch}) {
        const url = `${!browser ? 'http://proxy' : ''}/module/${params.catchall}`;
        const options = {headers: {'User-Agent': 'harmony-core'}};

        const response = await fetch(url, options);

        let dirname = params.catchall;
        if (dirname.indexOf('.') > 0) {
            dirname = dirname.substring(0, dirname.indexOf('/'));
        }

        return {
            status: response.status,
            props: {
                base: dirname,
                html: await response.text(),
            }
        };
    }
</script>

<script>
    export let base, html;
</script>

<svelte:head>
    <base href="/{base}/"/>
</svelte:head>

{@html html}
