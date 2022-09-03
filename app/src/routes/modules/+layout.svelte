<script>
    import {navigating} from '$app/stores'
    import {invalidate} from '$app/navigation'
    import SignIn from '$lib/components/signIn.svelte'

    /** @type {import('./$types').PageData} */
    export let data

    async function signOut() {
        await fetch('/auth/', {
            method: 'DELETE'
        })

        window.google.accounts.id.disableAutoSelect()

        await invalidate()
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
{:else if data.isAuthenticated === false}
    <SignIn googleClientId="{data.googleClientId}"></SignIn>
{:else if data.isAuthenticated === true}
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
                            <a href="{module._computed.url.core}"
                               class="list-group-item list-group-item-action position-relative">
                                {module.name || module._computed.id}
                                <div class="position-absolute top-50 end-0 translate-middle-y small">
                                    {#if module._computed.version.upgrade === 'misconfigured' }
                                    <span class="badge text-bg-danger me-2" data-bs-toggle="tooltip"
                                          data-bs-placement="left" data-bs-title="Module misconfigured">
                                        <i class="fa-solid fa-xmark"></i>
                                    </span>
                                    {:else if module._computed.version.upgrade === 'patch' }
                                    <span class="badge text-bg-success me-2" data-bs-toggle="tooltip"
                                          data-bs-placement="left" data-bs-title="Patch update available">
                                        <i class="fa-solid fa-arrow-up"></i>
                                    </span>
                                    {:else if module._computed.version.upgrade === 'minor'}
                                    <span class="badge text-bg-warning me-2" data-bs-toggle="tooltip"
                                          data-bs-placement="left" data-bs-title="Minor update available">
                                        <i class="fa-solid fa-arrow-up"></i>
                                    </span>
                                    {:else if module._computed.version.upgrade === 'major'}
                                    <span class="badge text-bg-danger me-2" data-bs-toggle="tooltip"
                                          data-bs-placement="left" data-bs-title="Major update available">
                                        <i class="fa-solid fa-arrow-up"></i>
                                    </span>
                                    {:else if module._computed.version.upgrade === 'unknown'}
                                    <span class="badge text-bg-secondary me-2" data-bs-toggle="tooltip"
                                          data-bs-placement="left" data-bs-title="Unknown version">
                                    <i class="fa-solid fa-question"></i>
                                </span>
                                    {/if}
                                </div>
                            </a>
                        {/each}
                    </div>
                {/if}
                {#if data.isAuthenticated == true}
                    <div class="list-group bg-white">
                        <a sveltekit:reload href="#" on:click={signOut} class="list-group-item list-group-item-action">
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
        }
    }
</style>
