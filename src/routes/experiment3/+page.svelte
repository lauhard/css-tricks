<script lang="ts">
    import { useGsap } from "$lib/gsap.svelte";

    const { tween, timeline, splitText, animationStore } = useGsap();
    const animantions = $derived(animationStore());
    $effect(() => {
        $inspect(animantions);
    });
</script>
<section class="hero">
    <h1>3</h1>
</section>
<section class="information"></section>
<style>
    .hero{
        background:gray;
        padding-top: var(--header-height);
        height: 100vh;
    }
</style>
