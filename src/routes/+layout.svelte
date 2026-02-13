<script lang="ts">
	import "$lib/css/main.css";
	import "$lib/css/component.css";
	import favicon from "$lib/assets/favicon.svg";
	import { routes } from "$lib/routes";
	import { LucideMenu } from "lucide-svelte";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import Navigation from "$lib/components/Navigation.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<main>
		<header class="header">
			<Navigation className="main-nav" {routes}></Navigation>
			<div class="theme-toggle">
				<ThemeToggle></ThemeToggle>
			</div>
			<button class="btn menu">Menu</button>
		</header>
		{@render children()}
	</main>
</div>

<style>
	main {
		header {
			position: fixed;
			display: flex;
			justify-content: space-between;
			max-height: var(--header-height);
			height: var(--header-height);
			width: 100%;
			.theme-toggle {
				position: relative;
				margin: auto 0;
				margin-left: 1rem;
			}
			.menu {
				display: flex;
				justify-self: right;
				background: transparent;
				font-size: 1.1rem;
				letter-spacing: 0.1rem;
				border: none;
				color: var(--color-ld-black-500);
				z-index: 3;
				text-transform: uppercase;
				margin: auto 0;
			}
		}
	}
</style>
