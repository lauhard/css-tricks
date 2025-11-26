<script lang="ts">
    import { page } from "$app/state";

    const { children } = $props();
</script>

<div class="layout experiments-page-layout">
    <nav class="page-aside-nav">
        <ul>
            <li>
                <a href="{page.url.origin}/experiments/hero-animation-1"
                    >Hero animation 1</a
                >
            </li>
            <li>
                <a href="{page.url.origin}/experiments/view-timeline-1"
                    >View timeline 1</a
                >
            </li>
        </ul>
    </nav>
    <div class="wrapper experiments-page-wrapper">{@render children()}</div>
</div>

<style lang="scss">
</style>
