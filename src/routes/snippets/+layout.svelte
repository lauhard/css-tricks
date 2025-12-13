<script lang="ts">
    import { page } from '$app/state';
    import Aside from '$lib/Components/Aside.svelte';

    let { children } = $props();
    const routes = [
        {
            path:`${page.url.origin}/snippets/animate-height-auto`,
            name:"Animate height auto"
        },
        {
            path:`${page.url.origin}/snippets/animate-display-none`,
            name:"Animate display none"
        }
    ]
</script>

<div class="layout snippets-page-layout">
    <Aside {routes} />
    <div class="wrapper snippets-page-wrapper">
        {@render children()}
    </div>
</div>

<style lang="scss">
</style>