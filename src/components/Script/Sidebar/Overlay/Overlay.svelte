<script>
  import { _script, _app, _cards } from "$lib";
  import PageInfo from "./PageInfo.svelte";
  import SectionPageInfo from "./SectionPageInfo.svelte";
  import Header from "./Header.svelte";
  import Toggle from "./Toggle.svelte";

  $: card = $_cards.find((card) => card.id === $_app.currentCard.id);
</script>

<div id="overlay" class="overlay rounded-bottom shadow-sm">
  {#if $_app.sidebar?.cardInfo?.show}
    <div class="p-1 mb-2">
      <Header {card} />

      {#if !card.section.isSection}
        <PageInfo {card} />
      {/if}
      {#if card.section.isSection}
        <SectionPageInfo {card} />
      {/if}
    </div>
  {/if}

  <Toggle />
</div>

<style>
  #overlay {
    position: fixed;
    background-color: var(--bs-body-bg);
    width: 335px;
    margin-left: 5px;
    z-index: 1000;
    font-family: Poppins, sans-serif;
  }
</style>
