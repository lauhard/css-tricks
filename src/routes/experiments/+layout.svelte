<script lang="ts">
    import { page } from "$app/state";
    import Aside from "$lib/Components/Aside.svelte";

    const { children } = $props();
    let routes = [
        {
            path: `${page.url.origin}/experiments/hero-animation-1`,
            name: "hero animation 1",
        },
        {
            path: `${page.url.origin}/experiments/horizontal-scroller-1`,
            name: "horizontal scroller 1",
        },
        {
            path: `${page.url.origin}/experiments/view-timeline-1`,
            name: "view timeline 1",
        },
        {
            path: `${page.url.origin}/experiments/grid-images`,
            name: "grid image",
        },
        
    ];
</script>

<div class="layout experiments-page-layout">
    <Aside {routes}></Aside>
    <div class="wrapper experiments-page-wrapper">{@render children()}</div>
</div>

<style lang="scss">
</style>
