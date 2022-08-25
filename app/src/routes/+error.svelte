<script>
    import { page } from '$app/stores';
</script>

<div class="h-100 w-100 p-5 align-items-center justify-content-center">
    <h1>{$page.status}</h1>
    <h2>{$page.error.message}</h2>
    <p><a href="/">Home</a></p>
</div>
