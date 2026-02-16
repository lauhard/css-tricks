<script lang="ts">
    import { useGsap, type Timeline } from "$lib/gsap.svelte";
    import { OutlineLogo, SolidLogo } from "$lib/svgs/logos.svelte";

    let { timeline } = useGsap();
    const timeLineConfig: Timeline = {
        name: "timeline13",
        vars: {
            scrollTrigger: {
                trigger: ".experiment",
                markers: true,
                pin: ".logo-wrapper",
                scrub: 1,
                start: "top top",
                end: "bottom bottom",
            },
        },
        tweens: [
            {
                name: "outline-logo",
                targets: ".outline-logo",
                to: {
                    opacity: 1,
                    duration: 0,
                },
            },
            {
                name: "outline-logo-path",
                targets: ".outline-logo path",
                from: {
                    drawSVG: 0,
                    duration: 1.5,
                    delay: 0.2,
                    ease: "power2.out",
                },
            },
            {
                name: "solid-logo",
                targets: ".solid-logo",
                to: {
                    opacity: 1,
                },
            },
        ],
    };
</script>

<div class="page">
    <section
        class="experiment"
        {@attach timeline(timeLineConfig)}
    >
        <div class="logo-wrapper">
            <div class="logo">
                {@render OutlineLogo("outline-logo")}
                {@render SolidLogo("solid-logo")}
            </div>
        </div>
    </section>
</div>

<style>
    .page {
        margin-top: var(--header-height);
        background-color: var(--color-black-400);
        position: relative;
        padding: 5rem;
        .experiment {
            height: 300vh;
            width: 100%;
            position: relative;
            border: 1px solid #444;
            .logo-wrapper {
                display: flex;
                height: 100vh;
                justify-content: center;
                align-items: center;
                .logo {
                    position: relative;
                }
            }
        }
    }

    :global(.outline-logo) {
         opacity: 0;
        position: absolute;
    }
    :global(.solid-logo) {
        opacity: 0;
        position: relative;
    }
</style>
