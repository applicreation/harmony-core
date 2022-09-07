<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

<div class="">
    <div class="p-3 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
        <h1 class="h2 m-0">{data.module.name}</h1>
        <div>
            <a href="https://github.com/{data.module.github.owner}/{data.module.github.name}/releases"
               class="text-decoration-none" target="_blank">
                <span class="badge bg-secondary me-1">{data.module.version}</span>
                {#if data.module._computed.version.upgrade === 'misconfigured' }
                    <span class="badge text-bg-danger">Misconfigured version</span>
                {:else if data.module._computed.version.upgrade === 'patch' }
                    <span class="badge text-bg-success">Patch update available</span>
                {:else if data.module._computed.version.upgrade === 'minor'}
                    <span class="badge text-bg-warning">Minor update available</span>
                {:else if data.module._computed.version.upgrade === 'major'}
                    <span class="badge text-bg-danger">Major update available</span>
                {:else if data.module._computed.version.upgrade === 'unknown'}
                    <span class="badge text-bg-secondary">Unknown version</span>
                {/if}
            </a>
        </div>
    </div>

    <div>
        {@html data.html}
    </div>
</div>
