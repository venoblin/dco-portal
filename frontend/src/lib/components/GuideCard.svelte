<script lang="ts">
  import { cleanTime } from '$lib/utils'
  
  let { guide } = $props() 
</script>

<div class="guide-card">
  <div>
    <a class="title" href={`/guides/${guide.id}`}>{guide.title} →</a>
    <p class="author muted-text">By {guide.author}</p>
    <p class="created-at muted-text">Created {cleanTime(guide.createdAt)}</p>
    {#if guide.updatedAt !== guide.createdAt}
      <p class="updated-at muted-text">Updated {cleanTime(guide.updatedAt)}</p>
    {/if}
  </div>
  <div>
    <p class="shortDescription">{guide.shortDescription}...</p>
  </div>
</div>

<style>
  .guide-card {
		padding-bottom: var(--default-spacing);
		margin-top: var(--default-spacing);
		border-bottom: var(--border-width) solid var(--bg-color);
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--default-spacing);
		height: 150px;
		overflow: hidden;
	}
	.guide-card div:first-of-type {
		border-right: var(--border-width) solid var(--bg-color);
		padding-right: var(--default-spacing);
	}
	.guide-card:first-of-type {
		margin-top: 0;
	}
	.guide-card:last-of-type {
		padding-bottom: 0;
		border-bottom: none;
	}
	.guide-card .title {
		font-size: 1.35em;
	}
</style>