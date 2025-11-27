<script lang="ts">
    // preload image
    import p1 from "$lib/assets/p1.jpg";
</script>

<section class="sub-page horizontal-scroller-1">
    <h1>Horizontal Scroller 1</h1>
    <div class="gallery">
        <ul class="scroller">
        </ul>
    </div>
</section>

<style lang="scss">
    .sub-page {
        height: 200vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        background-color: green;
        overflow: clip;
    }
    .gallery {
        position: absolute;
        top: 20%;
        transform: translateY(-50%);
        width: 100vw;
        height: 400px;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        border: 2px solid black;
        background-color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
</style>
