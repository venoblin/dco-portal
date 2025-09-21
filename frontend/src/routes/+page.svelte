<script>
  import Panel from '$lib/components/ui/Panel.svelte'
</script>

<header>
  <h1>Dashboard</h1>
</header>

<div class="dashboard">
  <Panel>
    <h2>Quick Links</h2>

    <div>
      <a class="block-link" href="/tools/triage-manager">Tools/Triage Manager →</a>
      <a class="block-link" href="/tools/incident-manager">Tools/Incident Manager →</a>
    </div>
  </Panel>

  <Panel>
    <h2>Recent Guides</h2>
  </Panel>
</div>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--default-spacing);
  }
</style>
