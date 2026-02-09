<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { type Route } from "$lib/routes";
    let {
        route,
        className, //inject Custom Class
        ...props
    }: {
        route: Route;
        className?: string;
    } = $props();

    const isActive = (routePath: string) => {
        const current = page.url.pathname;
        if (routePath === "/") return current === "/";
        return current === routePath || current.startsWith(routePath + "/");
    };
</script>

{#snippet GetIconFromRoute(route: Route)}
    {#if route?.icon != undefined}
        {@const Icon = route.icon}
        <Icon size="1.5rem" />
    {/if}
{/snippet}

<li
    class="nav-item {className}"
    class:active={route.path ? isActive(route.path) === true : false}
    data-hasList={route?.subRoutes ? "true" : "false"}
    data-route-name={route.name}
    {...props}
>
    <a class="nav-link " href={resolve(route.path as any)}>
        {@render GetIconFromRoute(route)}
        {route.name}
    </a>
</li>
