<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

{#if Object.values(data.modules).length > 0}
    <div class="p-3">
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {#each Object.values(data.modules) as module}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="{module.urlCore}" class="text-body text-decoration-none">{module.name}</a>
                            </h5>
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
{/if}
