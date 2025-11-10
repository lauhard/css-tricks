<script lang="ts">
    import { routes } from '$lib/routes';
    let scroll=$state(0);
    let clientHeight=$state(0);
    let direction=$state("");
    // svelte-ignore non_reactive_update
    let offset=0;
   
    $effect(() => {
        // get page offset
       if(scroll > 100 || direction == "up") {
            if(offset > clientHeight - scroll ) {
                direction="up"
            } else {
                direction="down"
            }
            offset=clientHeight - scroll
       }
   });

</script>
<svelte:window bind:scrollY={scroll}  />
<svelte:body bind:clientHeight={clientHeight}/>
<nav style="transform: translate({(direction === 'up' ) ? ' -50%, -100%' : '-50%, 10px'})">
    <ul>
        {#each routes as { path, name }}
            <li><a href={path}>{name}</a></li>
        {/each}
    </ul>
</nav>
<style>
    nav {
        width: 55%;
        left: 50%;
        transform: translate(-50%,0%);
        border-radius: 15px;
        padding-block: 10px;
        background-color: rgba(255, 255, 255, 0.548);
        position: fixed;
        z-index: 999;
        transition: all 0.3s ease-in-out;
       
        animation-timeline: scroll();
    }
    nav:hover {
        background-color: rgba(255, 255, 255, 0.774);
        transition: all 0.3s ease-in-out;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>