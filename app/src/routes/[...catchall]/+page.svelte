<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

Catch all

{#if data.isAuthenticating}
    <a href="/auth/google/signout">Sign out</a>
{/if}
