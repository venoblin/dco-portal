<script>
  import GuideCard from '$lib/components/GuideCard.svelte'
  import Panel from '$lib/components/ui/Panel.svelte'

  const { data } = $props()
  
</script>

<header>
  <h1>Dashboard</h1>
</header>

<div class="dashboard">
  <Panel>
    <header>
      <h2>Quick Links</h2>
    </header>

    <div>
      <a class="block-link" href="/tools/triage-manager">Tools/Triage Manager →</a>
      <a class="block-link" href="/tools/incident-manager">Tools/Incident Manager →</a>
    </div>
  </Panel>

  <Panel>
    <header>
      <h2>Recent Guides</h2>
      <a class="block-link" href="/guides">View More →</a>
    </header>
    {#await data.guides}
      <p class="msg">Loading guides...</p>
    {:then guides}
      {#if guides && guides.length > 0}
        {#each guides as g}
          <GuideCard guide={g} />
        {/each}
      {:else}
        <p class="msg">There are no guides!</p>
      {/if}
    {:catch error}
      <p class="error">An error occurred: {error.message}</p>
    {/await}
  </Panel>
</div>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--default-spacing);
  }
</style>
