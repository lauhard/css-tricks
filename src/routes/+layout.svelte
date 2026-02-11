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
			<div class="theme-toggle">
				<ThemeToggle></ThemeToggle>
			</div>
			<button class="btn menu">Menu</button>
		</header>
		<Navigation className="main-nav" routes={routes}></Navigation>
		{@render children()}
	</main>
</div>

<style>
	main {
		header {
			position: relative;
			display: flex;
			justify-content: space-between;
			.theme-toggle {
				margin-top: 10px;
			}
			.menu {
				display: flex;
				justify-self: right;
				background: transparent;
				font-size: 1.1rem;
				letter-spacing: 0.1rem;
				border: none;
				text-transform: uppercase;
			}
		}
		
	}
</style>
