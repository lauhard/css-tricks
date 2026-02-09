<script lang="ts">
    import type { Route } from "$lib/routes";
    import NavigationItem from "./NavigationItem.svelte";
    import Aside from "./Aside.svelte";
    import { LucideMenu } from "lucide-svelte";
    let {
        routes,
        className,
        ...props
    }: { routes: Route[]; className?: string } = $props();
    let showAsideNav = $state(false);
    const asideId = "nav-aside";
</script>

<nav class="nav {className}" {...props}>
    <ul class="nav-items center">
        {#each routes as route}
            <NavigationItem {route}></NavigationItem>
        {/each}
    </ul>
    <div class="nav-burger-menu">
        <button
            type="button"
            class="btn btn-burger"
            aria-label="Menü öffnen"
            aria-controls={asideId}
            aria-expanded={showAsideNav}
            onclick={() => {
                showAsideNav = true;
            }}
        >
            <LucideMenu></LucideMenu>
        </button>
    </div>
    <Aside bind:showState={showAsideNav} {routes}></Aside>
</nav>
