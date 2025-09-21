<script>
  import Panel from '$lib/components/ui/Panel.svelte'
  import GuideCard from '$lib/components/GuideCard.svelte'

  let { data } = $props()
  let search = $state('')

  const onSearch = (event) => {
    event.preventDefault()
  }

</script>

<header>
  <h1>Guides</h1>

  <div>
    <form onsubmit={(event) => onSearch(event)}>
      <label for="search"></label>
      <input 
        id="search"
        type="text"
        name="search"
        placeholder="Title"
        bind:value={search}
      />

      <button class="search">Search</button>
    </form>
  </div>

  <div>
    <a class="btn" href="/guides/new">Create Guide</a>
  </div>
</header>

<Panel>
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

<style>
  form {
    display: flex;
  }
</style>