<script>
    import config from '$lib/stores/config.js';
</script>

{#if Object.values($config.modules || {}).length > 0}
    <div class="p-3">
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {#each Object.values($config.modules) as module}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="{module.urlCore}" class="text-body text-decoration-none">{module.name}</a></h5>
                            <p class="card-text">{module.description || 'No description available.'}</p>
                        </div>
                        <div class="card-footer p-2">
                            <a href="{module.urlCore}" class="btn btn-sm btn-primary">Open</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{:else }
    <div class="h-100 py-5 d-flex align-items-center justify-content-center">
        No modules loaded.
    </div>
{/if}

