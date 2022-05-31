<script>
    import {navigating} from '$app/stores'
    import {SyncLoader} from 'svelte-loading-spinners'
    import Menu from '$lib/components/Menu.svelte';
</script>

<svelte:head>
    <title>Harmony</title>
</svelte:head>

<div class="body flex-grow-1 d-lg-flex">
    <div class="row g-0 w-100">
        <div class="col-12 col-lg-2">
            <Menu/>
        </div>
        <div class="col">
            {#if $navigating}
                <div class="h-100 py-5 d-flex align-items-center justify-content-center">
                    <SyncLoader color="#F79905"/>
                </div>
            {:else}
                <slot></slot>
            {/if}
        </div>
    </div>
</div>
