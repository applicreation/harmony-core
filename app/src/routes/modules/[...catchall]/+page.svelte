<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

<svelte:head>
    <base href="/modules/{data.base}/"/>
</svelte:head>

{@html data.html}
