<script lang="ts">
    import { page } from "$app/state";
    import Aside from "$lib/Components/Aside.svelte";

    const { children } = $props();
    const routes = [
        {
            path: `${page.url.origin}/components/infinite-scroller`,
            name: "Infinite Scroller",
        },
        {
            path: `${page.url.origin}/components/scroll-progress`,
            name: "Scroll Progress",
        },
    ];
</script>

<div class="layout components-page-layout">
    <Aside {routes}></Aside>
    <div class="wrapper components-page-wrapper">{@render children()}</div>
</div>

<style lang="scss">
</style>
