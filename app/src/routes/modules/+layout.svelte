<script>
    import {navigating} from '$app/stores'
    import {SyncLoader} from 'svelte-loading-spinners'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<header class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Harmony</a>
        {#if Object.values(data.modules).length > 0}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        {/if}
    </div>
</header>

<div class="flex-grow-1 d-lg-flex">
    <div class="row g-0 w-100">
        <nav id="main-menu" class="col-12 col-lg-2 p-3 bg-light collapse">
            <div class="list-group bg-white mb-3">
                <div class="list-group bg-white">
                    <a href="/modules" class="list-group-item list-group-item-action">Home</a>
                </div>
            </div>
            {#if Object.values(data.modules).length > 0}
                <div class="list-group bg-white mb-3">
                    {#each Object.values(data.modules) as module}
                        <a href="{module.urlCore}" class="list-group-item list-group-item-action">
                            {module.name}
                        </a>
                    {/each}
                </div>
            {/if}
            {#if data.isAuthenticating}
                <div class="list-group bg-white">
                    <a sveltekit:reload href="/auth/google/signout" class="list-group-item list-group-item-action">
                        Sign out
                    </a>
                </div>
            {/if}
        </nav>
        <main class="col bg-white">
            {#if $navigating}
                <div class="h-100 d-flex py-5 align-items-center justify-content-center">
                    <SyncLoader color="#000"/>
                </div>
            {:else }
                <slot></slot>
            {/if}
        </main>
    </div>
</div>

<style>
    @media (min-width: 992px) {
        #main-menu {
            display: block !important;
        }
    }
</style>
