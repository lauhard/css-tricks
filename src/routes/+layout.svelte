<script lang="ts">
	import "../main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/Components/Navigation.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<!-- <Navigation /> -->
	<main>
		<header>
			<Navigation />
		</header>
		<div class="layout">
			{@render children()}
		</div>
	</main>
	<footer>
		<p>
			&copy; {new Date().getFullYear()} CSS Tricks. All rights reserved.
		</p>
	</footer>
</div>
