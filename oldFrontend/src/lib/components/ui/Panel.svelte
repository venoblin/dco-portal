<script>
  let { children } = $props()
</script>

<div class="panel">
  {@render children?.()}
</div>

<style>
  .panel {
		background: var(--overlay-bg-color);
		padding: var(--default-spacing);
		border-radius: var(--default-border-radius);
	}

	:global {
		.panel header {
			background: var(--overlay-bg-color);
			position: static;
			border-color: var(--bg-color);
			height: fit-content;
			padding-bottom: var(--default-spacing);
			margin-bottom: var(--default-spacing);
		}
	}
</style>