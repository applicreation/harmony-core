<script>
    import {onMount} from 'svelte'
    import {invalidateAll} from '$app/navigation'

    export let googleClientId

    let google = false
    let button

    onMount(() => {
        window.google.accounts.id.initialize({
            auto_select: true,
            callback: async (response) => {
                google = true

                await fetch('/auth/', {
                    method: 'POST',
                    body: JSON.stringify({
                        credential: response.credential,
                    })
                })

                await invalidateAll()
            },
            client_id: googleClientId,
        })

        window.google.accounts.id.renderButton(button, {
            size: "medium",
            text: "continue_with",
            theme: "outline",
        })

        window.google.accounts.id.prompt()
    })
</script>

<div class="px-5 m-auto">
    {#if !google}
        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
        Waiting for user sign in...
        <hr>
        <p>Alternatively, sign in with a different account using the button below.</p>
        <div class="d-inline" bind:this={button}></div>
    {:else}
        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
        Signing into Harmony...
    {/if}
</div>
