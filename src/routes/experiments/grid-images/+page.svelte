<script lang="ts">
    import p1 from "$lib/assets/p1.jpg";
    import p2 from "$lib/assets/p2.jpg";
    import p3 from "$lib/assets/p3.jpg";
    import p4 from "$lib/assets/p4.jpg";
    import p5 from "$lib/assets/p5.jpg";
    import p6 from "$lib/assets/p6.jpg";
</script>

<section class="sub-page grid-images">
    <h1 class="h1">Grid Images</h1>
    <div class="image-grid">
        <div class="image"><img src={p1} alt="dummy image1" /></div>
        <div class="image"><img src={p2} alt="dummy image2" /></div>
        <div class="image"><img src={p3} alt="dummy image3" /></div>
        <div class="image"><img src={p4} alt="dummy image4" /></div>
        <div class="image"><img src={p5} alt="dummy image5" /></div>
        <div class="image"><img src={p6} alt="dummy image6" /></div>
    </div>
</section>

<style lang="scss">
    :root{
        --image-width:200px;
        --image-height:calc(var(--image-width * 1.5));
    }
    .grid-images {
        width: 800px;
        margin-top: 1rem;
        text-align: center;
    }
    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--image-width), 1fr));
        grid-auto-flow: dense;
        row-gap: 1rem;
        column-gap: 1rem;
        place-items: center;
        .image {
            display: grid;
            place-items: center;
            min-width:var(--image-width);
            max-width: var(--image-width);
            min-height: var(--image-width);
            max-height: var(--image-height);
            height: max-content;
            width: max-content;
            @media (width < 750px) {
                max-width: 100%;
                width: 100%;
                max-height: 100%;
                height: 100%;
            }
            img {
                display: block;
                object-fit: cover;
                object-position: center center;
                max-height: inherit;
                min-height: inherit;
                min-width: inherit;
                max-width: inherit;
                height: inherit;
                width: inherit;
                border-radius: 20px;
                transform: scale(1);
                box-shadow: 1px 3px 5px hsla(0, 2%, 12%, 0.4);
                border: 1px solid inherit;

                &:hover {
                    box-shadow: 1px 3px 7px hsla(0, 2%, 12%, 0.6);
                    transform: scale(1.01);
                }
                @media (width < 700px) {
                   object-fit: cover;
                }
                transition: all ease-in-out 200ms;
            }
        }
    }
</style>
