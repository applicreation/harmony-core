<script context="module">
    import {browser} from '$app/env';

    /** @type {import('./__types/[slug]').Load} */
    export async function load({params, fetch}) {
        const url = `${!browser ? 'http://proxy' : ''}/module/${params.catchall}/`;
        const response = await fetch(url);

        return {
            status: response.status,
            props: {
                html: await response.text(),
            }
        };
    }
</script>

<script>
    import Menu from '$lib/components/Menu.svelte';

    export let html;
</script>

<div class="body flex-grow-1 d-lg-flex">
    <div class="row g-0 w-100">
        <div class="col-12 col-lg-2">
            <Menu/>
        </div>
        <div class="col">
            {@html html}
        </div>
    </div>
</div>
