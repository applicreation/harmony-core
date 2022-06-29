<script>
    import {onMount} from "svelte";
    import {navigating} from '$app/stores'
    import {SyncLoader} from 'svelte-loading-spinners'
    import auth from "$lib/services/auth";
    import Menu from '$lib/components/Menu.svelte';
    import {isChecked, isUser} from "$lib/stores/user.js";

    onMount(async () => await auth.isAuthenticated());
</script>

<svelte:head>
    <title>Harmony</title>
</svelte:head>

<div class="body flex-grow-1 d-lg-flex">
    {#if !$isChecked}
        <div class="w-100 h-100 py-5 d-flex align-items-center justify-content-center">
            <SyncLoader color="#F79905"/>
        </div>
    {:else if $isUser}
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
    {:else}
        <div class="h-100 w-100 py-5 d-flex align-items-center justify-content-center auth">
            <a class="btn btn-secondary" on:click="{auth.login}">Log In</a>
        </div>
    {/if}
</div>

<style>
    .auth {
        background: #F42714; /* Old browsers */
        background: -moz-linear-gradient(45deg, #F42714 0%, #F79905 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(45deg, #F42714 0%, #F79905 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(45deg, #F42714 0%, #F79905 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
</style>
