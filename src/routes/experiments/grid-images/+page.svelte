<script lang="ts">
    import { browser } from "$app/environment";
    import p1 from "$lib/assets/p1.jpg";
    import p2 from "$lib/assets/p2.jpg";
    import p3 from "$lib/assets/p3.jpg";
    import p4 from "$lib/assets/p4.jpg";
    import p5 from "$lib/assets/p5.jpg";
    import p6 from "$lib/assets/p6.jpg";
    let activeImage = $state(false);
    let index = $state("-1");

    const expand = (e: MouseEvent) => {
        e.preventDefault();
        let li: HTMLLIElement | null = (e.target as HTMLElement)
            ?.parentElement as HTMLLIElement;

        // Wenn bereits aktiv und gleiches Bild geklickt -> schließen
        if (activeImage && li?.dataset?.index === index) {
            document.startViewTransition(() => {
                activeImage = false;
            });
            return;
        }

        if (li) {
            index = li.dataset?.index ?? "-1";
        }

        document.startViewTransition(() => {
            activeImage = true;
        });
    };
</script>

<section
    class="sub-page grid-images match-element-applied"
    class:image-active={activeImage}
>
    <div
        class="overlay"
        onclick={() =>
            document.startViewTransition(() => (activeImage = false))}
    ></div>
    <h1 class="h1">Grid Images</h1>

    <ul class="image-grid">
        {@render imageCard(p1, "0")}
        {@render imageCard(p2, "1")}
        {@render imageCard(p3, "2")}
        {@render imageCard(p4, "3")}
        {@render imageCard(p5, "4")}
        {@render imageCard(p6, "5")}
    </ul>
</section>

{#snippet imageCard(src: string, _index: string)}
    <li
        class="image"
        data-index={_index}
        class:big-image={activeImage == true && index == _index}
        class:hidden-image={activeImage == true && index != _index}
        style="view-transition-name: {activeImage && index != _index
            ? 'none'
            : `image-${_index}`}"
    >
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <img {src} alt="dummy image1 ${_index}" onclick={expand} />
    </li>
{/snippet}

<style lang="scss">
    :root {
        --image-width: 200px;
        --image-height: calc(var(--image-width * 1.5));
    }
    .grid-images {
        width: 800px;
        margin-top: 1rem;
        text-align: center;
        overflow: hidden;
    }
    .image-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(var(--image-width), 1fr)
        );
        overflow: hidden;
        grid-auto-flow: dense;
        row-gap: 1rem;
        column-gap: 1rem;
        place-items: center;
        .image {
            display: grid;
            place-items: center;
            min-width: var(--image-width);
            max-width: var(--image-width);
            min-height: var(--image-width);
            max-height: calc(var(--image-width) * 1.5);
            height: max-content;
            width: max-content;
            z-index: 1;
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
                cursor: pointer;
                &:hover {
                    box-shadow: 1px 3px 7px hsla(0, 2%, 12%, 0.6);
                    transform: scale(1.01);
                }
                @media (width < 700px) {
                    object-fit: cover;
                }
            }
        }
        .big-image {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            min-height: auto;
            max-height: none;
            min-width: auto;
            max-width: none;
            img {
                max-height: 500px;
                min-height: 200px;
                max-width: 500px;
                min-width: 200px;
                height: 500px;
                width: auto;
                @media (width < 700px) {
                    object-fit: cover;
                    max-width: fit-content;
                    max-height: fit-content;
                    width: 90svw;
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
    }
    .image-active .overlay {
        opacity: 1;
        pointer-events: auto;
    }
    .hidden-image {
        opacity: 0.3;
    }
</style>
