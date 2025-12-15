<script lang="ts">
    import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";
    import { preload } from "$lib";
    import p1 from "$lib/assets/p1.jpg";
    import p1_min from "$lib/assets/p1_min.jpg";
    import p2 from "$lib/assets/p2.jpg";
    import p2_min from "$lib/assets/p2_min.jpg";
    import p3 from "$lib/assets/p3.jpg";
    import p3_min from "$lib/assets/p3_min.jpg";
    import p4 from "$lib/assets/p4.jpg";
    import p4_min from "$lib/assets/p4_min.jpg";
    import p5 from "$lib/assets/p5.jpg";
    import p5_min from "$lib/assets/p5_min.jpg";
    import p6 from "$lib/assets/p6.jpg";
    import p6_min from "$lib/assets/p6_min.jpg";
    import { onMount } from "svelte";

    type imgArgs = {
        index: string;
        width?: string;
        height?: string;
        placeholder?: string;
    };

    let innerWidth = $state(0);
    $effect(() => {
        innerWidth;
        console.log("effect: innerWidth", innerWidth);
    });
    onNavigate(() => {
        console.log("onNavigate: innerWidth", innerWidth);
    });
    onMount(() => {
        console.log("onMount: innerWidth", innerWidth);
    });

    let activeImage = $state(false);
    let index = $state("-1");

    const expand = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        let li: HTMLLIElement | null = target.closest("li") as HTMLLIElement;

        if (li) {
            index = li.dataset?.index ?? "-1";
            document.startViewTransition(() => {
                activeImage = !activeImage;
            });
        }
    };
    const closeOverlay = (e: MouseEvent | TouchEvent | KeyboardEvent) =>
        document.startViewTransition(() => {
            activeImage = false;
        });
</script>

<svelte:window bind:innerWidth />
<section class="sub-page grid-images" class:image-active={activeImage}>
    <div
        class="overlay"
        role="button"
        aria-label="dd"
        tabindex="0"
        onclick={closeOverlay}
        onkeydown={closeOverlay}
    ></div>
    <h1 class="h1">Grid Images</h1>

    <ul class="image-grid match-element-applied">
        {@render imageCard(p1, {
            index: "0",
            width: "280",
            height: "410",
            placeholder: p1_min,
        })}
        {@render imageCard(p2, {
            index: "1",
            width: "280",
            height: "280",
            placeholder: p2_min,
        })}
        {@render imageCard(p3, {
            index: "2",
            width: "280",
            height: "280",
            placeholder: p3_min,
        })}
        {@render imageCard(p4, {
            index: "3",
            width: "280",
            height: "280",
            placeholder: p4_min,
        })}
        {@render imageCard(p5, {
            index: "4",
            width: "280",
            height: "410",
            placeholder: p5_min,
        })}
        {@render imageCard(p6, {
            index: "5",
            width: "280",
            height: "280",
            placeholder: p6_min,
        })}
    </ul>
</section>

{#snippet imageCard(src: string, args: imgArgs)}
    <li
        class="image"
        data-index={args.index}
        class:big-image={activeImage == true && index == args.index}
        class:hidden-image={activeImage == true && index != args.index}
        style="view-transition-name: {activeImage && index != args.index
            ? 'none'
            : `image-${args.index}`}"
    >
        <a href="#" role="button" onclick={expand} onkeydown={expand}>
            <svelte:boundary>
                {#snippet pending()}
                    {#if args.placeholder}
                        <img
                            class="placeholder"
                            src={args?.placeholder}
                            alt="place-holder"
                            style:with="{args.width}px"
                            style:height="{args.height}px"
                        />
                    {/if}
                {/snippet}
                {@const img = await preload(src)}
                {#if img}
                    <img
                        width={args.width}
                        height={args.height}
                        src={img.src}
                        alt="dummy image1 ${args.index}"
                        loading="lazy"
                    />
                {/if}
            </svelte:boundary>
        </a>
    </li>
{/snippet}

<style lang="scss">
    :root {
        --image-width: 280px;
        --image-height: 410px;
    }
    //@media (width < 850px) {
    //    :root {
    //     --image-width: 200px;
    //    --image-height: calc(var(--image-width * 1.2));
    //
    //    }
    //}
    .grid-images {
        width: 900px;
        margin-inline: auto; // Zentriert den Container horizontal
        margin-top: 1rem;
    }
    .placeholder {
        min-width: inherit;
        min-height: inherit;
        object-fit: cover;
        object-position: center center;
        background-color: red;
        border-radius: 20px;
        overflow: hidden;
        filter: blur(10px);
    }
    .image-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(var(--image-width), 250px)
        );
        overflow: hidden;
        grid-auto-flow: dense;
        row-gap: 1rem;
        column-gap: 1rem;
        place-items: center center;
        justify-content: center; // Zentriert die Grid-Spalten horizontal
        width: 100%;
        .image,
        a {
            display: grid;
            place-items: center;
            min-width: var(--image-width);
            max-width: 100%; //var(--image-width)
            min-height: var(--image-width);
            max-height: var(--image-height);
            height: fit-content; //max-content
            width: fit-content; //max-content
            //@media (width < 700px) {
            //    max-width: 100%;
            //    width: 100%;
            //    //width: var(--image-width);
            //    max-height: 100%;
            //    height: 100%;
            //}

            //@media (width < 400px) {
            //    max-width: 100%;
            //    width: 300px;
            //    max-height: 100%;
            //    height: 100%;
            //}

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
                box-shadow: 1px 3px 5px hsla(0, 2%, 12%, 0.4);
                border: 1px solid inherit;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                will-change: box-shadow;
                transition: box-shadow 200ms ease-in-out;
                &:hover {
                    box-shadow: 1px 3px 7px hsla(0, 2%, 12%, 0.6);
                    transition: box-shadow 200ms ease-in-out;
                }
            }
        }
        //.image:nth-of-type(even) {
        //    @media (width < 700px) {
        //        justify-self: start;
        //    }
        //}
        //.image:nth-of-type(odd) {
        //    @media (width < 700px) {
        //        justify-self: end;
        //    }
        //}

        .big-image {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 15;
            min-height: auto;
            max-height: none;
            min-width: auto;
            max-width: none;
            @media (width < 700px) {
                max-width: 100%;
                width: 100%;
                max-height: auto;
                height: auto;
            }
            a {
                min-width: auto;
                max-width: none;
                min-height: auto;
                max-height: none;
                width: auto;
                height: auto;
            }

            img {
                max-height: 70svh;
                min-height: 200px;
                max-width: 70svw;
                min-width: 200px;
                height: 100%;
                width: auto;
                @media (width < 700px) {
                    max-width: 95svw;
                    width: 95svw;
                    height: minmax(70svh, 100%);
                    min-height: 50svh;
                    max-height: 70svh;
                    width: 100%;
                }
            }
        }
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 20%, 0.856);
        z-index: 5;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        view-transition-name: none;
    }
    .image-active .overlay {
        opacity: 1;
        pointer-events: auto;
    }
    .hidden-image {
        opacity: 0.3;
        view-transition-name: none;
    }
</style>
