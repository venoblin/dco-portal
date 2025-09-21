<script lang="ts">
  import Panel from '$lib/components/ui/Panel.svelte'
  import GuideCard from '$lib/components/GuideCard.svelte'

  let { data } = $props()

</script>

<header>
  <h1>Guides</h1>

  <div>
    <a class="btn" href="/guides/new">Create Guide</a>
  </div>
</header>

<Panel>
  {#if data.guides.length > 0}
    {#each data.guides as g}
      <GuideCard guide={g} />
    {/each}
  {:else}
    <p class="msg">There are no guides!</p>
  {/if}
</Panel>