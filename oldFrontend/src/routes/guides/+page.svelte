<script>
  import { getGuidesByTitle } from '$lib/services/guides'
  import Panel from '$lib/components/ui/Panel.svelte'
  import GuideCard from '$lib/components/GuideCard.svelte'

  const { data } = $props()
  let guides = $state(data.guides)
  let search = $state('')

  const onSearch = async (event) => {
    event.preventDefault()

    const res = await getGuidesByTitle(search)
    guides = res.guides
  }

</script>

<header>
  <h1>Guides</h1>

  
</header>

<Panel>
  {#await guides}
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