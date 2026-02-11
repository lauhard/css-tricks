<script lang="ts">
    import type { Route } from "$lib/routes";
    import NavigationItem from "./NavigationItem.svelte";
    let {
        routes,
        className,
        ...props
    }: { routes: Route[]; className?: string } = $props();
</script>

<nav class="nav {className}" {...props}>
    <ul class="nav-items center">
        {#each routes as route}
            <NavigationItem {route}></NavigationItem>
        {/each}
    </ul>
</nav>
