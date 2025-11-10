<script lang="ts">
    import starbucks from "$lib/assets/starbucks-100.svg";
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

    import HorizontalScoller from "$lib/Components/HorizontalScoller.svelte";
  
</script>

<section>
    <h1>Scroll Timeline</h1>
    <article>
        <h2>Lorem</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
    </article>
    <article class="sponsors">
        <h2>Our Sponsors</h2>
   
            <HorizontalScoller speed="2s" width="800px" direction="reverse">
                <li class="sponsor">
                    <a
                        href="https://www.apple.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            src={apple}
                            alt="Apple Logo"
                            width="100"
                            height="100"
                        />
                    </a>
                </li>
                <li class="sponsor">
                    <a
                        href="https://www.bbc.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            src={bbc}
                            alt="BBC Logo"
                            width="100"
                            height="100"
                        />
                    </a>
                </li>
                <li class="sponsor">
                    <a
                        href="https://www.hbo.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            src={hbo}
                            alt="HBO Logo"
                            width="100"
                            height="100"
                        />
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
                    <a
                        href="https://www.brave.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            src={brave}
                            alt="Brave Logo"
                            width="100"
                            height="100"
                        />
                    </a>
                </li>
                <li class="sponsor">
                    <a
                        href="https://www.amazon.com"
                        target="_blank"
                        rel="noopener"
                    >
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
                    <a
                        href="https://www.subway.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            src={subway}
                            alt="Subway Logo"
                            width="100"
                            height="100"
                        />
                    </a>
                </li>
            </HorizontalScoller>

    </article>
     <article class="team">
        <h2>Our Team</h2>
            <HorizontalScoller speed="2s" width="800px" direction="reverse">
                <li class="team-member">
                    <img loading="eager" src={p1} alt="p1">
                </li>
                <li class="team-member">
                    <img loading="eager" src={p2} alt="p2">
                </li>
                <li class="team-member">
                    <img loading="eager" src={p3} alt="p3">
                </li>
                <li class="team-member">
                    <img loading="eager" src={p4} alt="p4">
                </li>
                <li class="team-member">
                    <img loading="eager" src={p5} alt="p5">
                </li>
                <li class="team-member">
                    <img loading="eager" src={p6} alt="p6">
                </li>
            </HorizontalScoller>
    </article>
</section>

<style lang="scss">
    section {
        margin: 0 auto;
        width: 100%;
    }
    h1 {
        text-align: center;
    }
    .sponsors, .team {
        width: 100%;
        height: auto;
    }
    .team-member{
        img{
            width:240px;
            height:240px;
            object-fit: cover;
            margin: .5rem;
            border-radius: 10px;
        }
    }
    .sponsor {
        /* width of the svg is 100px */
        padding: 1rem;
        border-radius: 10px;
        // box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.308);
        // background: linear-gradient(160deg, #d8d2d2, #332e2eb7);
        a {
            display: flex;
            flex: 1;
            width: 100%;
            height: 100%;
            img {
                display: flex;
                object-fit: cover;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
