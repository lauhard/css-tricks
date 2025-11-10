<script lang="ts">
	import "../main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/Components/Navigation.svelte";
	import ScrollTimeLine from "$lib/Components/ScrollTimeLine.svelte";
	import TextFadeOut from "$lib/Components/TextFadeOut.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<ScrollTimeLine />

	<Navigation />
	<!-- <Navigation /> -->
	<TextFadeOut height="160px" />

	<main>
		{@render children()}
	</main>

	<footer>
		<p style="text-align: center; padding: 1rem 0;">
			&copy; {new Date().getFullYear()} CSS Tricks. All rights reserved.
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1; /* take up remaining space from header and footer */
		padding-inline: 1rem; /* replace with css variable */
		max-width: 800px; /* replace with css variable */
		margin: 100px auto;
		width: 100%;
		box-sizing: border-box;
	}
</style>
