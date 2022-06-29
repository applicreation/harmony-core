<script>
    import auth from "$lib/services/auth";
    import config from '$lib/stores/config.js';
</script>

<header class="h-100 bg-light text-white">
    <div class="hstack gap-3 mx-2">
        <a href="/" class="header-brand w-100 fs-1 p-2 d-inline-block text-lg-center text-white text-decoration-none">
            Harmony
        </a>
        {#if Object.values($config.modules || {}).length > 0}
            <div class="d-lg-none d-grid">
                <button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu"
                        aria-expanded="false" aria-controls="main-menu">
                    Menu
                </button>
            </div>
        {/if}
    </div>

    <div class="collapse" id="main-menu">
        <div class="list-group bg-white m-3">
            <a href="/" class="list-group-item list-group-item-action">Home</a>
        </div>
        {#if Object.values($config.modules || {}).length > 0}
            <div class="list-group bg-white m-3">
                {#each Object.values($config.modules) as module}
                    <a href="{module.urlCore}" class="list-group-item list-group-item-action">{module.name}</a>
                {/each}
            </div>
        {/if}
        <div class="list-group bg-white m-3">
            <a href="/#" on:click="{auth.logout}" class="list-group-item list-group-item-action">Logout</a>
        </div>
    </div>

</header>

<style>
    @import url('https://fonts.googleapis.com/css?family=Pacifico');

    header {
        background: #F42714; /* Old browsers */
        background: -moz-linear-gradient(45deg, #F42714 0%, #F79905 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(45deg, #F42714 0%, #F79905 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(45deg, #F42714 0%, #F79905 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }

    .header-brand {
        font-family: 'Pacifico', cursive;
    }

    @media (min-width: 992px) {
        #main-menu {
            display: block !important;
        }
    }
</style>
