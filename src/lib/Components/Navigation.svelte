<script lang="ts">
    import { SquareChevronDown } from "lucide-svelte";
    import { routes } from "$lib/routes";
    let scroll = $state(0);
    let clientHeight = $state(0);
    let direction = $state("");
    let closed = $state(false);
    // svelte-ignore non_reactive_update
    let offset = 0;

    $effect(() => {
        // get page offset
        if (scroll > 100 || direction == "up") {
            if (offset > clientHeight - scroll) {
                direction = "up";
            } else {
                direction = "down";
            }
            offset = clientHeight - scroll;
        }
    });
</script>

<svelte:window bind:scrollY={scroll} />
<svelte:body bind:clientHeight />

<nav
    style="transform: translate({direction === 'up' || closed === true
        ? ' -50%, -100%'
        : '-50%, 10px'})"
>
    <div class="hover-wrapper">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye-closed-icon lucide-eye-closed my-eye-closed"
            onclick={() => {
                closed = false;
                console.log("my-eye-closed", closed);
            }}
            class:my-eye-closed={closed == true}
            ><path d="m15 18-.722-3.25" /><path
                d="M2 8a10.645 10.645 0 0 0 20 0"
            /><path d="m20 15-1.726-2.05" /><path d="m4 15 1.726-2.05" /><path
                d="m9 18 .722-3.25"
            /></svg
        >
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye-icon lucide-eye"
            class:my-eye={closed == false}
            onclick={() => {
                closed = true;
                console.log("my-eye", closed);
            }}
            ><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle
                cx="12"
                cy="12"
                r="3"
            /></svg
        >
    </div>
    <ul>
        {#each routes as { path, name }}
            <li><a href={path}>{name}</a></li>
        {/each}
    </ul>
    <div
        class="chevron-wrapper"
        class:my-chevron-down={closed === true}
        role="button"
        tabindex="0"
        onclick={() => {
            closed = false;
            direction = "down";
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-square-chevron-down-icon lucide-square-chevron-down"
            ><rect width="18" height="18" x="3" y="3" rx="2" /><path
                d="m16 10-4 4-4-4"
            /></svg
        >
    </div>
</nav>

<style lang="scss">
    nav {
        width: 65%;
        
        left: 50%;
        height: 80px;
        transform: translate(-50%, 0%);
        border-radius: 15px;
        padding-block: 10px;
        background-color: rgb(255, 255, 255);
        position: fixed;
        z-index: 999;
        transition: all 0.3s ease-in-out;
        @media (width < 700px){
                width:100%;
                min-width: 100%;
        }
        animation-timeline: scroll();
       
        .hover-wrapper {
            bottom: -5px;
            right: -2px;
            z-index: 1000;
            cursor: pointer;
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            opacity: 0;
            @media (width < 800px) {
                opacity: 1;
                right: 50%;
                transform: translateX(50%);
            }
            transition: all 0.3s ease-in-out;

            .lucide-eye-closed-icon,
            .lucide-eye-icon {
                width: 20px;
                height: 20px;
                color: #333;
                transition: opacity 0.3s ease-in-out;
                opacity: 0;
                display: none;
            }

            .my-eye-closed {
                display: block;
                opacity: 1;
            }
            .my-eye {
                display: block;
                opacity: 1;
            }
        }
        .chevron-wrapper {
             width: 50px;
            height: 50px;
            color: #333;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 50%;
            opacity: 0;
            transform: translate(-50%, -200%);
            transition: all 300ms ease-in-out;
            background-color: #f3f3f3;
            box-shadow: 0 2px 4px rgba(36, 34, 34, 0.39);
            border-radius: 10px;
            .lucide-square-chevron-down {
                width: 30px;
                height: 30px;
                color: #333;
                stroke-width: 1.5px;
            }
        }
        .my-chevron-down {
            left: 50%;
            opacity: 1;
            transform: translate(-50%, 15px);

            transition: all 300ms ease-in-out;
            transition-delay: 200ms;
        }

        ul {
            list-style: none;
            display: flex;
            gap: 1rem;
            padding: 1rem;
            margin: 0;
            justify-content: center;
        }

        a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
            transition: all 0.3s ease-in-out;
        }

        a:hover {
            color: tomato;
            transition: all 0.3s ease-in-out;
        }
        @media (width < 800px) {
            ul {
                padding-top: 0.5rem;
            }
            .my-chevron-down {
                transform: translate(-50%, 20px);
                transition: all 300ms ease-in-out;
                transition-delay: 200ms;
            }
        }
    }
    nav:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        .hover-wrapper {
            opacity: 1;
        }
        transition: all 0.3s ease-in-out;
    }
</style>
