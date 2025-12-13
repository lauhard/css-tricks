<script lang="ts">
    import p1 from "$lib/assets/p1.jpg";
    import p2 from "$lib/assets/p2.jpg";
    import p3 from "$lib/assets/p3.jpg";
    import p4 from "$lib/assets/p4.jpg";
    import p5 from "$lib/assets/p5.jpg";
    import p6 from "$lib/assets/p6.jpg";
</script>

<section class="sub-page grid-images">
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
    .grid-images {
        margin-top: 10rem;
        width: 800px;
    }
    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-flow: dense;
        row-gap: 1rem;
        column-gap: 1rem;
        place-items: center;
        // background-color: blue;
        //border: 1px solid blue;
        .image {
            // background-color: orange;
            //border: 1px solid orange;
            display: grid;
            place-items: center;
            min-width: 200px;
            max-width: 200px;
            min-height: 200px;
            max-height: 300px;
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
                //object-fit: contain;
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
                   //width: 100%;
                   //height: 100%;
                   //max-height: 100%;
                   //max-width: 100%;
                   object-fit: cover;
                   //background-color: red;
                }
                transition: all ease-in-out 200ms;
                //background-color: red;
                //border: 1px solid red;
            }
        }
    }
</style>
