<script>
    import config from '$lib/stores/config.js';
</script>

<header class="h-100 bg-light text-white">
    <a href="/" class="header-brand w-100 fs-1 p-2 mb-3 d-inline-block text-center text-white text-decoration-none">
        Harmony
    </a>

    <div class="list-group bg-white mx-3">
        <a href="/" class="list-group-item list-group-item-action">Home</a>
        {#each Object.values($config.modules || {}) as module}
            <a href="{module.url}" class="list-group-item list-group-item-action">{module.name}</a>
        {/each}
    </div>
</header>

<style>
    @import url('https://fonts.googleapis.com/css?family=Pacifico');

    header {
        background: #004186; /* Old browsers */
        background: -moz-linear-gradient(45deg, #004186 0%, #007afd 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(45deg, #004186 0%, #007afd 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(45deg, #004186 0%, #007afd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }

    .header-brand {
        font-family: 'Pacifico', cursive;
    }
</style>
