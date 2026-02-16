<script lang="ts">
    import { useGsap } from "$lib/gsap.svelte";
    import gsap from "gsap";
    var grid: [number, number] = [5, 13], //[rows, columns]
        tlx = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }),
        axis: "x" | "y" = "y",
        ease = "none",
        from: "center" | "start" | "end" | "edges" | "random" = "center";

    const tweenRepeatCallback = function (
        this: gsap.core.Tween,
        param1: string,
        param2: string,
    ) {
        const el = this.targets()[0] as HTMLElement;
        // Example: read current transform-y and opacity from the live element
        const y = gsap.getProperty(el, "y"); // number
        const opacity = gsap.getProperty(el, "opacity"); // numbe
        console.log("teenRepeat", param1, param2, {
            progress: this.progress(),
            y,
            opacity,
        });
    };

    const {
        splitText,
        tween,
        restart,
        pause,
        play,
        animationStore,
        unregisterAnimation,
        getAnimation,
    } = useGsap();
    const animations = $state(animationStore());
</script>

<section class="experiment">
    <nav class="nav animation1">
        <button
            class="btn"
            onclick={() => {
                restart(getAnimation("animation1"));
                restart(getAnimation("animation1-1"));
            }}>Restart</button
        >
        <button class="btn" onclick={() => {
                pause(getAnimation("animation1"));
                pause(getAnimation("animation1-1"));
            }}
            >Pause</button
        >
        <button class="btn" onclick={() => {
                play(getAnimation("animation1"));
                play(getAnimation("animation1-1"));
            }}
            >Play</button
        >
    </nav>
    <h1
        class="hero-text"
        {@attach splitText({
            target: ".hero-text",
            vars: {
                type: "words, chars",
                wordsClass: "word++",
                charsClass: "char",
                mask: "chars",
            },
        })}
        {@attach tween([
            {
                targets: ".word1 .char",
                name: "animation1",
                from: {
                    y: 50,
                    autoAlpha: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
            },
            {
                targets: ".word2 .char",
                name: "animation1-1",
                from: {
                    x: -150,
                    y: -160,
                    autoAlpha: 0,
                    stagger: 0.2,
                    duration: 0.2,
                    ease: "back.out(1.7)",
                    delay: 0.3,
                },
            },
        ])}
    >
        HELLO GSAP
    </h1>

    <nav class="nav animation2">
        <button
            disabled={!getAnimation("animation2")}
            class="btn"
            onclick={() =>
                unregisterAnimation("animation2", {
                    atTime: 1,
                    suppressEvents: false,
                })}>unregister Animation</button
        >
        <button
            disabled={!getAnimation("animation2")}
            class="btn"
            onclick={() => restart(getAnimation("animation2"))}>Restart</button
        >
        <button
            disabled={!getAnimation("animation2")}
            class="btn"
            onclick={() => pause(getAnimation("animation2"))}>Pause</button
        >
        <button
            disabled={!getAnimation("animation2")}
            class="btn"
            onclick={() => play(getAnimation("animation2"))}>Play</button
        >
    </nav>
    <h2
        class=""
        {@attach tween([
            {
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
                    onRepeat: tweenRepeatCallback,
                    onRepeatParams: ["param1", "param2"],
                },
            },
        ])}
    >
        Bouncy GSAP
    </h2>

    <nav class="nav animation3">
        {#if getAnimation("animation3")}
            <!-- <p style="color:white;">d {animations["animation2"]?.name}</p> -->
        {/if}

        <button
            disabled={!getAnimation("animation3")}
            class="btn"
            onclick={() =>
                unregisterAnimation("animation3", {
                    atTime: 1,
                    suppressEvents: false,
                })}>unregister Animation</button
        >
        <button
            disabled={!getAnimation("animation3")}
            class="btn"
            onclick={() => restart(getAnimation("animation3"))}>Restart</button
        >
        <button
            disabled={!getAnimation("animation3")}
            class="btn"
            onclick={() => pause(getAnimation("animation3"))}>Pause</button
        >
        <button
            disabled={!getAnimation("animation3")}
            class="btn"
            onclick={() => play(getAnimation("animation3"))}>Play</button
        >
    </nav>
    <div
        class="boxes"
        {@attach tween([
            {
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
            },
        ])}
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
    .experiment {
        padding-top: var(--header-height);
        padding-inline-start: 8rem;
        .nav {
            &:not(:first-of-type) {
                margin-top: 10rem;
            }
        }
        h1,
        .hero-text,
        h2 {
            font-family: "Alpino-Black";
            letter-spacing: 0.4rem;
            text-transform: uppercase;
            margin: 0;
        }
        h1,
        .hero-text {
            font-size: 15rem;
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
