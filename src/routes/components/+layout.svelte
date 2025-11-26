<script lang="ts">
    import { page } from "$app/state";

    const { children } = $props();
</script>

<div class="layout components-page-layout">
    <nav class="page-aside-nav">
        <ul>
            <li>
                <a href="{page.url.origin}/components/infinite-scroller"
                    >Infinite Scroller</a
                >
            </li>
            <li>
                <a href="{page.url.origin}/components/scroll-progress"
                    >Scroll Progress</a
                >
            </li>
        </ul>
    </nav>
    <div class="wrapper components-page-wrapper">{@render children()}</div>
</div>

<style lang="scss">
</style>
