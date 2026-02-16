<script lang="ts">
	import "$lib/css/main.css";
	import "$lib/css/component.css";
	import favicon from "$lib/assets/favicon.svg";
	import { routes } from "$lib/routes";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import Navigation from "$lib/components/Navigation.svelte";
	import NavigationItem from "$lib/components/NavigationItem.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header class="header">
		<div class="theme-toggle">
			<ThemeToggle></ThemeToggle>
		</div>
		<button
			popovertarget="mypopover"
			class="btn btn-menu"
			popovertargetaction="toggle">Menu</button
		>
	</header>
	<div popover id="mypopover">
		<ul class="nav-items center">
			{#each routes as route}
				<NavigationItem className="xx" {route}></NavigationItem>
			{/each}
		</ul>
	</div>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		position: relative;
		header {
			position: fixed;
			display: flex;
			justify-content: space-between;
			max-height: var(--header-height);
			height: var(--header-height);
			width: 100%;
			z-index: 100;
			background-color: var(--color-ld-white-300);
			.theme-toggle {
				position: relative;
				margin: auto 0;
				margin-left: 1rem;
			}
			.btn-menu {
				display: flex;
				justify-self: right;
				background: transparent;
				font-size: 1.1rem;
				letter-spacing: 0.1rem;
				border: none;
				color: var(--color-ld-black-500);
				text-transform: uppercase;
				margin: auto 0;
				margin-right: 2rem;
				anchor-name: --anchor-btn-menu;
				border: 1px solid var(--color-ld-white-500);
			}
		}
		main {
			height: inherit;
		}
	}

	#mypopover {
		height: 10rem;
		width: clamp(16rem, 4vw, 32px);
		position-anchor: --anchor-btn-menu;
		min-height: fit-content;
		height: 100%;
		max-height: max-content;
		inset: unset;
		/* inset: 0; overrides the anchor position */
		top: anchor(bottom);
		right: anchor(right);
		margin: 0;
		margin-top: 0.5rem;
		border: none;
		corner-shape: squircle;
		border-radius: 10px;
		padding: 1.5rem 2rem;
		border: 0.5px solid var(--color-ld-white-400);
		box-shadow: var(--shadow-md);
	}
	:global(.nav-link) {
		font-size: 1.2rem;
		font-weight: 400;
	}
</style>
