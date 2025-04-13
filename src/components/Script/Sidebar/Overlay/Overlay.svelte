<script>
  import { _script, _app, _cards } from "$lib";
  import PageInfo from "./PageInfo.svelte";
  import Header from "./Header.svelte";
  import Toggle from "./Toggle.svelte";

  $: card = $_cards.find((card) => card.id === $_app.currentCard.id);
</script>

<div id="overlay" class="overlay rounded-bottom p-1 shadow-sm">
  {#if $_app.sidebar.cardInfo.show}
    <Header {card} />
    <PageInfo {card} />
  {/if}
  <Toggle />
</div>

<style>
  #overlay {
    position: fixed;

    background-color: white;
    width: 335px;
    margin-left: 5px;
    z-index: 1000;
    font-family: Poppins, sans-serif;
  }
</style>
