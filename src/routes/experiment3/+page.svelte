<script lang="ts">
    import {
        killScrollTrigger,
        useGsap,
        type Split,
        type Timeline,
        type Tween,
    } from "$lib/gsap.svelte";
    import {
        Highlighted1,
        Highlighted2,
        Highlighted3,
    } from "$lib/svgs/utils.svelte";

    const { tween, timeline, splitText, animationStore } = useGsap();
    const animantions = $derived(animationStore());

    $effect(() => {
        $inspect(animantions);
    });
    const splitTextConfig: Split = {
        vars: {
            type: "words, chars",
            wordsClass: "word",
            charsClass: "char",
            mask: "words",
            deepSlice: false,
        },
    };
    const tweenConfig: Tween[] = [
        {
            targets: "h1, .word",
            from: {
                y: "100%",
                stagger: 0.1,
                ease: "circ.inOut",
            },
        },
    ];

    const timeLineConfig: Timeline = {
        name: "timeline3",
        vars: {
            scrollTrigger: {
                trigger: "h2",
                start: "top center",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
                markers: true,
            },
        },
        tweens: [
            {
                from: {
                    opacity: 0,
                    duration: 0.8,
                },
            },
            {
                targets: ".path-1",
                from: {
                    drawSVG: 0,
                },
                position: "<",
            },
            {
                targets: ".path-2",
                from: {
                    drawSVG: 0,
                },
            },
            {
                targets: ".path-3",
                from: {
                    drawSVG: 0,
                },
            },
        ],
    };
</script>

<section class="hero">
    <h1
        class="grid"
        {@attach splitText(splitTextConfig)}
        {@attach tween(tweenConfig)}
    >
        <span class="g gsap"> gsap </span>
        <span class="g scroll">scroll</span>
        <span class="g triggered"> triggered </span>
        <span class="g animations"> animations </span>
    </h1>
</section>
<section class="information">
    <div class="frame">
        <h2 class="info-text" {@attach timeline(timeLineConfig)}>
            {@render ScrollTriggerWord("Scroll-Trigger")} enables anyone to create
            <span class="nowrap">jaw-dropping</span>
            {@render ScrollBasedWord("scroll-based")} animations with minimal code.
            Infinitely flexible. Scrub, pin, span or just {@render TriggerAnythingWord(
                "trigger anything",
            )} scroll-related, even if it has nothing to do
            <span class="nowrap"> with animations. </span>
        </h2>
    </div>
</section>

{#snippet ScrollTriggerWord(word: string)}
    <span class="scroll-trigger-word">
        {@render Highlighted1("highlighted1")}
        {word}
    </span>
{/snippet}

{#snippet ScrollBasedWord(word: string)}
    <span class="scroll-based-word">
        {@render Highlighted2("highlighted2-3")}
        {word}
    </span>
{/snippet}

{#snippet TriggerAnythingWord(word: string)}
    <span class="trigger-anything-word">
        {@render Highlighted3("highlighted2-3")}
        {word}
    </span>
{/snippet}

<style>
    .hero {
        background: var(--color-ld-white-400);
        height: 100vh;
        display: grid;
        place-items: center;
        .grid {
            display: grid;
            font-family: var(--serif);
            font-size: 5.5rem;
            grid-template-columns: 800px;
            grid-template-rows: fit-content(100%);
            place-self: center;
            font-weight: normal;
            .g {
                line-height: 6.5rem;
                display: inline-block;
            }
            .gsap,
            .animations {
                letter-spacing: 0rem;
                color: var(--color-ld-accent-500);
            }
            .scroll,
            .triggered {
                text-transform: uppercase;
            }
            .gsap {
                text-align: left;
            }
            .scroll {
                text-align: center;
                padding-right: 5rem;
            }
            .animations {
                text-align: right;
            }
        }
    }
    .information {
        min-height: 100vh;
        width: 100vw;
        padding: 2rem;
        display: flex;
        align-items: stretch;
        justify-content: stretch;
        margin-bottom: 100vh;

        .frame {
            border: 2px solid var(--color-ld-white-500);
            padding: 10px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .info-text {
                font-size: 4vh;
                font-weight: 400;
                line-height: 1.8;
                text-align: center;
                max-width: 80rem; /* Tailwind max-w-7xl */
                margin-left: auto; /* damit max-width bei text-center auch wirklich zentriert ist */
                margin-right: auto;
                text-wrap: balance; /* Tailwind text-balance (modern) */
                .nowrap {
                    white-space: preserve nowrap;
                }
            }
        }
    }
    .scroll-trigger-word,
    .scroll-based-word,
    .trigger-anything-word {
        position: relative;
    }
    .scroll-based-word,
    .trigger-anything-word {
        white-space: nowrap;
    }
    :global(.highlighted1) {
        position: absolute;
        top: 0.2em;
        left: 0;
        mix-blend-mode: multiply;
    }
    :global(.highlighted2-3) {
        position: absolute;
        bottom: 0;
        left: 0;
        mix-blend-mode: normal;
    }
</style>
