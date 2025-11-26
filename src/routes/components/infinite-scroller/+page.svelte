<script lang="ts">
    import apple from "$lib/assets/apple-100.svg";
    import bbc from "$lib/assets/bbc-100.svg";
    import hbo from "$lib/assets/hbo-100.svg";
    import microsoft from "$lib/assets/microsoft-100.svg";
    import brave from "$lib/assets/brave-100.svg";
    import amazon from "$lib/assets/amazon-100.svg";
    import discord from "$lib/assets/discord-100.svg";
    import nordvpn from "$lib/assets/nordvpn-100.svg";
    import subway from "$lib/assets/subway-100.svg";

    import p1 from "$lib/assets/p1.jpg";
    import p2 from "$lib/assets/p2.jpg";
    import p3 from "$lib/assets/p3.jpg";
    import p4 from "$lib/assets/p4.jpg";
    import p5 from "$lib/assets/p5.jpg";
    import p6 from "$lib/assets/p6.jpg";
    import InfiniteScroller from "$lib/Components/InfiniteScroller.svelte";
    let innerWidth = $state<number>(0);
        let scrollerWidth = $state<string>('800px');
    $effect(() => {
        // console.log("innerWidth changed:", innerWidth);
        if(innerWidth < 600){
            console.log("innerWidth is less than 600px");
            scrollerWidth = innerWidth - 150 + "px";
        }
    });
</script>
<svelte:window bind:innerWidth /> 
<section class="sub-page infinite-scroller">
    <h1>Infinite Scroller Component</h1>
    <p>This page demonstrates the use of the Infinite Scroller Component.</p>
    <article class="sponsors">
        <h2>Our Sponsors</h2>
        <InfiniteScroller speed="10s" width={scrollerWidth} direction="reverse">
            <li class="sponsor">
                <a href="https://www.apple.com" target="_blank" rel="noopener">
                    <img
                        src={apple}
                        alt="Apple Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a href="https://www.bbc.com" target="_blank" rel="noopener">
                    <img src={bbc} alt="BBC Logo" width="100" height="100" />
                </a>
            </li>
            <li class="sponsor">
                <a href="https://www.hbo.com" target="_blank" rel="noopener">
                    <img src={hbo} alt="HBO Logo" width="100" height="100" />
                </a>
            </li>
            <li class="sponsor">
                <a
                    href="https://www.microsoft.com"
                    target="_blank"
                    rel="noopener"
                >
                    <img
                        src={microsoft}
                        alt="Microsoft Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a href="https://www.brave.com" target="_blank" rel="noopener">
                    <img
                        src={brave}
                        alt="Brave Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a href="https://www.amazon.com" target="_blank" rel="noopener">
                    <img
                        src={amazon}
                        alt="Amazon Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a
                    href="https://www.discord.com"
                    target="_blank"
                    rel="noopener"
                >
                    <img
                        src={discord}
                        alt="Discord Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a
                    href="https://www.nordvpn.com"
                    target="_blank"
                    rel="noopener"
                >
                    <img
                        src={nordvpn}
                        alt="NordVPN Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
            <li class="sponsor">
                <a href="https://www.subway.com" target="_blank" rel="noopener">
                    <img
                        src={subway}
                        alt="Subway Logo"
                        width="100"
                        height="100"
                    />
                </a>
            </li>
        </InfiniteScroller>
    </article>
    <article class="team">
        <h2>Our Team</h2>
        <InfiniteScroller speed="10s" width={scrollerWidth} direction="reverse">
            <li class="team-member">
                <img
                    loading="eager"
                    src={p1}
                    width="100"
                    height="100"
                    alt="p1"
                />
            </li>
            <li class="team-member">
                <img
                    loading="eager"
                    src={p2}
                    width="100"
                    height="100"
                    alt="p2"
                />
            </li>
            <li class="team-member">
                <img
                    loading="eager"
                    src={p3}
                    width="100"
                    height="100"
                    alt="p3"
                />
            </li>
            <li class="team-member">
                <img
                    loading="eager"
                    src={p4}
                    width="100"
                    height="100"
                    alt="p4"
                />
            </li>
            <li class="team-member">
                <img
                    loading="eager"
                    src={p5}
                    width="100"
                    height="100"
                    alt="p5"
                />
            </li>
            <li class="team-member">
                <img
                    loading="eager"
                    src={p6}
                    width="100"
                    height="100"
                    alt="p6"
                />
            </li>
        </InfiniteScroller>
    </article>
</section>

<style lang="scss">
   
    .sponsors {
        overflow: hidden;
        width: 100%;
        .sponsor{
            img{
                min-width: 50px;
                min-height: 50px;
            }
        }
   }
   .team {
        overflow: hidden;
        width: 100%;
        .team-member{
            margin-inline: 1rem;
            img{
                border-radius: 50%;
                min-width: 50px;
                min-height: 50px;
                object-fit: cover;
                max-width: 120px;
                max-height: 120px;
            }
        }
   }    
</style>
