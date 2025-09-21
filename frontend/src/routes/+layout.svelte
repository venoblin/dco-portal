<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte'
	import favicon from '$lib/assets/favicon.svg'
	import '../styles/global.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>DCO Hub</title>
	
	<link rel="icon" href={favicon} />
</svelte:head>

<NavBar />

<main>
	<div class="main-wrap">
		{@render children?.()}
	</div>
</main>

<footer>2025 DCO Hub</footer>

<style>
	.main-wrap {
		padding: var(--default-spacing);
		padding-left: calc(var(--nav-width) + var(--default-spacing));
	}

	main,
	footer {
		margin-left: auto;
		margin-right: auto;
		max-width: 1750px;
	}

	main {
		position: relative;
		min-height: 90vh;
	}

	footer {
		display: flex;
		align-content: center;
		justify-content: center;
		padding: var(--default-spacing);
		margin-top: 2rem;
		color: var(--muted-text-color);
	}
</style>
