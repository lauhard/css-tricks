<script lang="ts">
    let { routes } = $props();
    let closed = $state(false);
</script>

<nav class="page-aside-nav" class:hide={closed == true}>
    <div
        class="chevron-wrapper"
        role="button"
        tabindex="0"
        onclick={() => {
            closed = !closed;
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
            class="lucide lucide-square-chevron-right-icon lucide-square-chevron-right desktop"
            ><rect width="18" height="18" x="3" y="3" rx="2" /><path
                d="m10 8 4 4-4 4"
            /></svg
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
            class="lucide lucide-square-chevron-up-icon lucide-square-chevron-up smartphone"
            ><rect width="18" height="18" x="3" y="3" rx="2" /><path
                d="m8 14 4-4 4 4"
            /></svg
        >
    </div>

    <ul>
        {#each routes as route}
            <li>
                <a
                    onclick={() => {
                        setTimeout(() => {
                            closed = true;
                        }, 200);
                    }}
                    href={route.path}
                    >{route.name}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .page-aside-nav {
        width: 300px;
        position: fixed;
        min-height: 200px;
        top: 45%;
        left: 0px;
        transform: translate(0%, -45%);
        border-radius: 1rem;
        background-color: #ffff;
        z-index: 9999;
        box-shadow: var(--box-shadow-elevation-1);
        padding: 1rem 1.5rem;

        ul {
            display: flex;
            flex-direction: column;

            li {
                a {
                    color: #0d0d0d;
                    font-weight: 500;

                    &:hover {
                        color: var(--color-accent-1);
                    }
                }
            }
        }
        transition: all ease-in-out 300ms;
        @media (width < 800px) {
            position: fixed;
            width: 100%;
            left: 0;
            top: auto;
            bottom: 0px;
            padding-top:2rem;
            transform: translateY(0);
            height: fit-content;
        }
        .chevron-wrapper {
            position: absolute;
            right: 0px;
            width: 50px;
            height: 50px;
            top: 50%;
            transform: translate(0%, -50%) rotate(180deg);
           
            display: flex;
            justify-content: center;
            align-items: center;
            .lucide {
                width: 30px;
                height: 30px;
            }
            .smartphone {
                display: none;
            }
            .desktop {
                display: block;
            }
            transition: all ease-in-out 300ms;
        }
        @media (width < 800px) {
            //display: none;
            .chevron-wrapper {
                width: 50px;
                height: 50px;
                position: absolute;
                top: 0px;
                left: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translate(-50%, 0%) rotate(180deg);

                .smartphone {
                    display: block;
                }
                .desktop {
                    display: none;
                }
                .lucide {
                    width: 30px;
                    height: 30px;
                }
                transition: all ease-in-out 300ms;
            }
        }
    }
    .hide {
        transform: translate(-100%, -45%);
        .chevron-wrapper {
            right: -55px;
            transform: translate(0%, -50%) rotate(0);
             background-color: #f3f3f3;
             border-radius: 10px;
            box-shadow: 0 2px 4px rgba(36, 34, 34, 0.39);
        }
        @media (width < 800px) {
            .chevron-wrapper {
                top: -55px;
                left: 50%;
                transform: translate(-50%, 0%);
            }
            //display: none;
            transform: translate(0%, 100%);
        }
        transition: all ease-in-out 300ms;
    }
</style>
