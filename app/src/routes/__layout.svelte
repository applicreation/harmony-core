<script>
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
            <slot></slot>
        </div>
    </div>
</div>
