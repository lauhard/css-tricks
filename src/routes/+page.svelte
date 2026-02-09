<script lang="ts">
    import { SplitText } from "gsap/SplitText";
    import gsap from "gsap";
    import type { Attachment } from "svelte/attachments";
    gsap.registerPlugin(SplitText);
    // split elements with the class "split" into words and characters

    const gsapTween = (
        element?: Node | Element[] | Element | HTMLElement,
        options?: GsapOptions,
    ): gsap.core.Tween | null => {
        if (element && options) {
            switch (options?.method) {
                case "from":
                    return options.from
                        ? gsap.from(element, options.from)
                        : null;
                case "to":
                    return options.to ? gsap.to(element, options.to) : null;
                case "fromTo":
                    return options.from && options.to
                        ? gsap.fromTo(element, options.from, options.to)
                        : null;
                default:
                    return options.from
                        ? gsap.from(element, options.from)
                        : null;
            }
        } else {
            return null;
        }
    };

    type GsapOptions = {
        name: string;
        targets?: gsap.TweenTarget;
        method?: "from" | "to" | "fromTo" | "timeline";
        from?: gsap.TweenVars;
        to?: gsap.TweenVars;
        split?: SplitText.Vars;
        autoplay?: boolean;
    };

    const tweenRepeat = function (
        this: gsap.core.Tween,
        param1: string,
        param2: string,
    ) {
        const el = this.targets()[0] as HTMLElement;

        // Example: read current transform-y and opacity from the live element
        const y = gsap.getProperty(el, "y"); // number
        const opacity = gsap.getProperty(el, "opacity"); // number

        console.log("teenRepeat", param1, param2, {
            progress: this.progress(),
            y,
            opacity,
        });
    };

    const tweenInterrupt = function (
        this: gsap.core.Tween,
        param1: string,
        param2: string,
    ) {
        const el = this.targets()[0] as HTMLElement;

        // Example: read current transform-y and opacity from the live element
        const y = gsap.getProperty(el, "y"); // number
        const opacity = gsap.getProperty(el, "opacity"); // number

        console.log("tweenInterrupt", param1, param2, {
            progress: this.progress(),
            y,
            opacity,
        });
    };

    type AnimationStore = {
        id: string;
        animation: any;
        name?: string;
    };

    $effect(() => {
        animations;
        console.log("effect animations", animations);
    });

    const useGsap = () => {
        let animations = $state<Record<string, AnimationStore>>({});
        return {
            animationStore() {
                return animations;
            },
            unregisterAnimation(name: string) {
                const entry = animations[name];
                if (!entry) return;

                const { animation } = entry;

                // if on start -> kill
                if (animation.time() === 0) {
                    animation.kill();
                    delete animations[name];
                    return;
                }

                // Clear any previous reverse-complete callback to avoid stacking
                animation.eventCallback("onReverseComplete", null);

                // wait for revert animation to be finished
                animation.eventCallback("onReverseComplete", () => {
                    animation.kill();
                    delete animations[name];
                    console.log("animations", animations);
                });

                animation.reverse(2, false);
            },
            tween(options: GsapOptions): Attachment {
                return (element: Element | Element[]) => {
                    if (options.split) {
                        let split = SplitText.create(element, {
                            ...options.split,
                        });
                        const targetType = (options.split.target ??
                            "chars") as keyof typeof split;
                        element = split[targetType] as Element[];
                    }
                    if (options.targets) {
                        console.log("targets", options.targets);
                        element = options.targets as Element;
                    }
                    let animation = gsapTween(element, options) as ReturnType<
                        typeof gsapTween
                    >;
                    // register animatiton
                    const id = crypto.randomUUID();
                    animations[options.name] = {
                        id: id, //not needed...
                        name: options.name,
                        animation: animation,
                    };
                    return () => {
                        // not needed svelte can handle the cleanup via signals.
                        // Object.entries(animations).forEach((a)=>{
                        //    console.log("animation", a);
                        //})
                        //animation = (animation as gsap.core.Tween)?.reverse(1);
                        //animation = null;

                        console.log(
                            "animation cleanup",
                            animations[options.name]?.name,
                        );
                        animations[options.name]?.animation.kill();
                        animations[options.name]?.animation.revert();
                        delete animations[options.name];
                    };
                };
            },
            //calll specific animation
            restart(entry: AnimationStore) {
                if (entry) entry.animation?.restart(true, false);
            },
            play(entry: AnimationStore) {
                if (entry) entry.animation?.play();
            },
            pause(entry: AnimationStore) {
                if (entry) entry.animation?.pause();
            },
        };
    };
    let { tween, play, pause, restart, animationStore, unregisterAnimation } =
        useGsap();
    let animations = $derived(animationStore());
    //GSAP 3 introduces advanced stagger values
    var grid: [number, number] = [5, 13], //[rows, columns]
        tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }),
        axis: "x" | "y" = "y",
        ease = "none",
        from: "center" | "start" | "end" | "edges" | "random" = "center";
</script>

<nav class="nav main">
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/experiment1">Experiment 1</a>
        </li>
    </ul>
</nav>

<section class="hero">
    <nav class="nav animation1">
        <button class="btn" onclick={() => restart(animations["animation1"])}
            >Restart</button
        >
        <button class="btn" onclick={() => pause(animations["animation1"])}
            >Pause</button
        >
        <button class="btn" onclick={() => play(animations["animation1"])}
            >Play</button
        >
    </nav>
    <h1
        class="hero-text"
        {@attach tween({
            method: "from",
            name: "animation1",
            from: {
                y: 50,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.7)",
            },
            split: {
                type: "words, chars",
                charsClass: "letter",
            },
        })}
    >
        HELLO GSAP
    </h1>

    <nav class="nav animation2">
        {#if animations["animation2"]}
            <!-- <p style="color:white;">d {animations["animation2"]?.name}</p> -->
        {/if}

        <button
            disabled={!animations["animation2"]}
            class="btn"
            onclick={() => unregisterAnimation("animation2")}
            >unregister Animation</button
        >
        <button
            disabled={!animations["animation2"]}
            class="btn"
            onclick={() => restart(animations["animation2"])}>Restart</button
        >
        <button
            disabled={!animations["animation2"]}
            class="btn"
            onclick={() => pause(animations["animation2"])}>Pause</button
        >
        <button
            disabled={!animations["animation2"]}
            class="btn"
            onclick={() => play(animations["animation2"])}>Play</button
        >
    </nav>
    <h2
        class=""
        {@attach tween({
            method: "fromTo",
            name: "animation2",
            from: {
                y: 0,
                autoAlpha: 1,
                color: "red",
                duration: 1,
                ease: "circ.out",
                yoyo: true,
                repeat: -1,
            },
            to: {
                y: 150,
                autoAlpha: 0,
                color: "blue",
                duration: 1,
                ease: "circ.in",
                yoyo: true,
                repeat: -1,
                paused: true,
                onRepeat: tweenRepeat,
                onRepeatParams: ["param1", "param2"],
            },
        })}
    >
        Bouncy GSAP
    </h2>

    <nav class="nav animation3">
        {#if animations["animation3"]}
            <!-- <p style="color:white;">d {animations["animation2"]?.name}</p> -->
        {/if}

        <button
            disabled={!animations["animation3"]}
            class="btn"
            onclick={() => unregisterAnimation("animation3")}
            >unregister Animation</button
        >
        <button
            disabled={!animations["animation3"]}
            class="btn"
            onclick={() => restart(animations["animation3"])}>Restart</button
        >
        <button
            disabled={!animations["animation3"]}
            class="btn"
            onclick={() => pause(animations["animation3"])}>Pause</button
        >
        <button
            disabled={!animations["animation3"]}
            class="btn"
            onclick={() => play(animations["animation3"])}>Play</button
        >
    </nav>
    <div
        class="boxes"
        {@attach tween({
            method: "to",
            name: "animation3",
            targets: ".box",
            to: {
                duration: 1,
                scale: 0.1,
                y: 60,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
                stagger: {
                    amount: 1.5,
                    grid: grid,
                    axis: axis,
                    ease: ease,
                    from: from,
                },
            },
        })}
    >
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
        <div class="box">5</div>
        <div class="box">6</div>
    </div>
</section>

<style>
    .nav {
        display: flex;
        margin-bottom: 2rem;
        gap: 1rem;
    }
    .main {
        justify-content: center;
        ul {
            display: flex;
            flex-direction: row;
            justify-self: center;
            align-self: center;
            gap: 1rem;
        }
    }
    .hero {
        padding-inline-start: 8rem;
        .nav {
            &:not(:first-of-type) {
                margin-top: 10rem;
            }
        }
        .hero-text,
        h2 {
            font-family: "Alpino-Black";
            letter-spacing: 0.4rem;
            text-transform: uppercase;
            margin: 0;
        }
        .hero-text {
            font-size: 15rem;
            span {
                /* color: var(--color-ld-accent-500); */
            }
        }
        .boxes {
            display: grid;
            grid-template-columns: repeat(auto-fit, 100px);
            grid-template-rows: auto;
            width: 320px;
            gap: 0.5rem 0.5rem;
            .box {
                background-color: aqua;
                height: 100px;
                color: black;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
