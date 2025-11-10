<script lang="ts">
    let { height = "0" } = $props();
    // create var for css
</script>
<div class="fade-out" style:height="{height != "0" ?  height : ""}"></div>
<style lang="scss">
   
    .fade-out {
        position: fixed;
        top: 0;
        left: 0;
        height: var(--fade-height);
        width: 100%;
        background: linear-gradient(to bottom, rgb(255, 255, 255) 5%, transparent 95%);
        z-index: 10;
    }
</style>