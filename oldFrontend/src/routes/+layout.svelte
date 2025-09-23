<script>
	import NavBar from '$lib/components/NavBar.svelte'
	import favicon from '$lib/assets/favicon.svg'
	import 'quill/dist/quill.snow.css'
	import '../styles/global.css'

	const { children } = $props()
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

</style>
