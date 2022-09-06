<script>
    import {navigating} from '$app/stores'
    import {invalidateAll} from '$app/navigation'
    import SignIn from '$lib/components/SignIn.svelte'

    /** @type {import('./$types').PageData} */
    export let data

    async function signOut() {
        await fetch('/auth/', {
            method: 'DELETE'
        })

        window.google.accounts.id.disableAutoSelect()

        await invalidateAll()
    }
</script>

<header class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a href="/modules" class="navbar-brand">Harmony</a>
        {#if data.isAuthenticating || Object.values(data.modules).length > 0}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu"
                    aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        {/if}
    </div>
</header>

{#if data.isAuthenticated === undefined}
    <div class="px-5 m-auto">
        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
    </div>
{:else if data.isAuthenticated === 401}
    <SignIn googleClientId="{data.googleClientId}"></SignIn>
{:else if data.isAuthenticated === 403}
    <div class="px-5 m-auto">
        <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Forbidden</h4>
            <p>You do not have access to view this, have you signed in with the correct account?</p>
            <hr>
            <p class="mb-0">
                <a href="#" on:click={signOut} class="btn btn-warning" data-sveltekit-reload>
                    Sign out
                </a>
            </p>
        </div>
    </div>
{:else}
    <div class="flex-grow-1 d-lg-flex">
        <div class="row g-0 w-100">
            <nav id="main-menu" class="col-12 col-lg-2 p-3 bg-light collapse border-end border-bottom">
                <div class="list-group bg-white mb-3">
                    <div class="list-group bg-white">
                        <a href="/modules" class="list-group-item list-group-item-action">Home</a>
                    </div>
                </div>
                {#if Object.values(data.modules).length > 0}
                    <div class="list-group bg-white mb-3">
                        {#each Object.values(data.modules) as module}
                            <a href="{module._computed.url.core}" class="list-group-item list-group-item-action">
                                {module.name || module._computed.id}
                            </a>
                        {/each}
                    </div>
                {/if}
                {#if data.isAuthenticated > 0}
                    <div class="list-group bg-white">
                        <a href="#" on:click={signOut} class="list-group-item list-group-item-action"
                           data-sveltekit-reload>
                            Sign out
                        </a>
                    </div>
                {/if}
            </nav>
            <main class="col">
                {#if $navigating}
                    <div class="h-100 py-5 d-flex align-items-center justify-content-center">
                        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                    </div>
                {:else }
                    <slot></slot>
                {/if}
            </main>
        </div>
    </div>
{/if}

<style>
    @media (min-width: 992px) {
        #main-menu {
            display: block !important;
            border-bottom: 0 !important;
        }
    }
    @media (max-width: 991px) {
        #main-menu {
            border-right: 0 !important;
        }
    }
</style>
