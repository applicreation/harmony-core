<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

<div class="h-100 d-flex flex-column">
    <div class="p-3 border-bottom">
        <h1 class="h2 m-0">{data.module.name}</h1>
    </div>

    <div class="flex-grow-1">
        {@html data.html}
    </div>

    <div class="p-3 border-top">
        <div>
            <a href="https://github.com/{data.module.github.owner}/{data.module.github.name}/tree/{data.module.version}"
               class="btn btn-secondary btn-sm" target="_blank">
                {data.module.version}
            </a>
            <a href="https://github.com/{data.module.github.owner}/{data.module.github.name}/releases" target="_blank"
               class="btn btn-secondary btn-sm">
                Releases
            </a>
            <a href="https://github.com/{data.module.github.owner}/{data.module.github.name}/issues" target="_blank"
               class="btn btn-secondary btn-sm">
                Issues
            </a>
        </div>

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
    </div>
</div>
