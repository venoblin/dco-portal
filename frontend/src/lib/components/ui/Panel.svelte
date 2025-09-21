<script lang="ts">
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
</style>