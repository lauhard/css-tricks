<script lang="ts">
    // preload image
    import logo from "$lib/assets/mountains-lake.jpg";
</script>

<section>
    <div class="landing-page">
        <img
            loading="eager"
            class="landing-image"
            src={logo}
            alt=""
            srcset=""
        />
        <h1>Animation Range</h1>
    </div>
    <article>
        <h2>lorem ipsum</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            fuga, sequi reiciendis dolores unde atque non aliquid in, inventore
            ullam earum, similique laborum a exercitationem eaque odio dolore
            architecto maxime. Fugiat ullam mollitia vitae praesentium dolor
            veritatis, officiis cum possimus ab eum id saepe, consequuntur magni
            soluta beatae neque quos deleniti? Debitis facilis aspernatur odit
            repellat optio? Dolor, nemo laborum! Dolor ipsa doloribus quia modi
            asperiores. Ipsa temporibus nihil consequatur assumenda iure
            delectus. Reprehenderit ab ipsam similique architecto adipisci
            possimus fugit mollitia qui, eos voluptatum! Ipsam dignissimos aut
            quidem error. Delectus cum architecto, asperiores placeat
            consequuntur voluptatum ea aliquam accusamus. Maxime magnam numquam
            commodi beatae impedit assumenda asperiores earum ipsum nisi saepe
            obcaecati, blanditiis eveniet repudiandae quas esse libero
            doloremque. Aut error consequuntur obcaecati suscipit explicabo
            eveniet illum dolore repellendus, nemo, possimus nam officiis iure
            voluptatem cumque exercitationem! Odit, ex? Earum recusandae
            accusamus molestias aut sint. Et, eveniet explicabo! Maiores! Ex ad
            deleniti in, eius unde atque fugit incidunt molestias officia. Esse
            accusamus tempora sint, quibusdam vel distinctio in dignissimos quas
            velit nam nisi dicta dolorum, error mollitia, natus quidem.
            Voluptatum voluptate ullam vero dignissimos omnis, quidem dolores
            eius laudantium? Rerum reiciendis eaque ut minima, expedita
            consequuntur similique sed cum nemo ab blanditiis atque tempora et
            deserunt itaque repellat omnis! Doloremque, quia laborum hic
            distinctio, ab laudantium esse aspernatur eos delectus sequi
            obcaecati ipsum provident incidunt mollitia aperiam eius repellendus
            minima magnam in corporis. Totam consequatur quam repudiandae
            recusandae mollitia. Tempore doloremque ut quasi ea sunt distinctio,
            iure aut animi enim explicabo, ex illum quos facilis veritatis? Quia
            beatae nobis quisquam qui ex eaque dolorum eius. Illo aliquam
            dignissimos a. Natus eveniet esse molestiae quae omnis error eius
            atque assumenda recusandae rem mollitia quis cumque similique
            impedit amet nemo sint, deleniti quibusdam magni distinctio beatae
            temporibus soluta! Neque, placeat in! Nesciunt numquam veniam beatae
            suscipit. Repellat temporibus omnis deserunt est nam tenetur rem aut
            sunt amet atque vitae esse, asperiores maiores error distinctio
            quaerat. Ipsum ea placeat dolor numquam suscipit!
        </p>
    </article>
</section>

<style>
    .landing-page {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        transition: all 3s ease-in-out;
        animation: sticky-parallax-header 3s linear forwards;
        animation-range: 0vh 80vh;
        animation-timeline: scroll();
    }
    .landing-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        position: absolute;
        margin: 0;
        padding: 0;
        left: 50%;
        z-index: 100;
        color: rgb(255, 255, 255);
        text-shadow: 5px 5px 40px rgba(19, 19, 19, 0.705);
        animation: position-hearder 3s linear forwards;
        animation-timeline: scroll();
        animation-range: 0vh 80vh;

    }
    article {
        padding-top: 100vh;
        transition: all 3s ease-in-out;
    }

    @keyframes sticky-parallax-header {
        from {
            height: 100vh;
        }
        to {
            height: 20vh;            
        }
    }

    @keyframes position-hearder {
        from {
            top: 50%;
            transform: translate(-50%, -50%);
            color: honeydew;
            font-size: calc(4vw + 1em);
        }
        to {
            top: 65%;
            transform: translate(-50%, -65%);
            font-size: 2.5rem;
        }
    }
</style>
