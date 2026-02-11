<script lang="ts">
    import { useGsap, type GsapOptions, GSDevTools } from "$lib/gsap.svelte";
    let {
        splitText,
        tween,
        timeline,
        play,
        pause,
        restart,
        animationStore,
        timelineStore,
        unregisterAnimation,
    } = useGsap();

    let animations = $derived(animationStore());
    let timelines = $derived(timelineStore());

    $effect(() => {
        $inspect(animations);
        if (timelines["timeline1"]) {
            GSDevTools.create({
                animation: timelines["timeline1"].timeline,
            });
        }
    });

    const splitTextConfig: GsapOptions = {
        split: {
            target: ".title",
            targetType: "chars",
            vars: {
                type: "words, chars",
                wordsClass: "word++",
                charsClass: "char",
                mask: "chars",
            },
        },
    };
    const tweenConfig1: GsapOptions = {
        timeline: {
            name: "timeline1",
            tweens: [
                {
                    name: "animation1",
                    method: "from",
                    targets: ".word1 .char",
                    from: {
                        y: "100%",
                        duration: 0.5,
                        stagger: 0.07,
                        ease: "circ.out",
                    },
                },
                {
                    name: "animation2",
                    method: "from",
                    targets: ".word2 .char",
                    from: {
                        x: "-100%",
                        duration: 0.2,
                        stagger: 0.07,
                        ease: "circ.out",
                    },
                    position: "-=.5s",
                },
                {
                    name: "dot",
                    method: "from",
                    targets: ".tl-dot",
                    from: {
                        opacity: 0,
                        repeat:10,
                        duration:0.1,
                        yoyo:true,
                        repeatDelay:0.05,
                    },
                    position: "<",
                },
                {
                    name: "line-start",
                    method: "from",
                    targets: ".tl-start",
                    from: {
                        height: 0,
                    },
                    position: "<",
                },
                {
                    name: "line-main",
                    method: "from",
                    targets: ".tl-main",
                    from: {
                        width: 0,
                    },
                    position: "<+0.2",
                },
                {
                    name: "animation3",
                    method: "from",
                    targets: ".word3 .char",
                    from: {
                        y: "-100%",
                        duration: 0.3,
                        stagger: 0.07,
                        ease: "circ.out",
                    },
                    position: "-=.5s",
                },
            ],
        },
    };
</script>

<section class="experiment">
    <h1
        class="title"
        {@attach splitText(splitTextConfig)}
        {@attach timeline(tweenConfig1)}
    >
        <span class="gsap">GSAP</span>
        <span class="timeline">
            <span class="">timeline</span>
            <div class="tl-wrapper">
                <div class="tl-main"></div>
                <div class="tl-start"></div>
            </div>
            <div class="tl-dot"></div>
        </span>
        <span class="basics">basics</span>
    </h1>
</section>

<style>
    .experiment {
        display: flex;
        height: 89vh;
        align-items: center;
        justify-content: center;
        letter-spacing: -0.05em; /* Tailwind "tracking-tighter" */
        .title {
            font-family: "Alpino-Black";
            letter-spacing: 0.4rem;
            text-transform: uppercase;
            margin: 0;
            font-size: min(20vh, 8vw);
            display: flex;
            flex-direction: column;
            gap: 0.2em;
            line-height: 1;
            text-align: left;
            text-transform: uppercase;
            position: relative;
            .gsap {
                position: relative;
                display: block;
                right: 1.5em;
                text-align: left;
            }
            .timeline {
                position: relaitve;
                display: block;
            }
            .tl-wrapper {
                position: relative;
                min-width: max-content;
                height: 0.04em;
                .tl-main {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    height: 0.04em;
                    background-color: #f97316;
                }
                .tl-start {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 0.16em;
                    width: 0.04em;
                    background-color: #f97316;
                }
            }
            .tl-dot {
                position: absolute;
                top: 1.1em;
                right: -0.16em;
                height: 0.08em;
                aspect-ratio: 1 / 1;
                background-color: #f97316; /* Tailwind bg-orange-500 */
                opacity: 1;
            }
        }
        .basics {
            position: relative;
            display: block;
            left: 1.6em;
            text-align: right;
        }
    }
</style>
