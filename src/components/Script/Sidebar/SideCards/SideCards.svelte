<script>
  import { _cards, _app } from "$lib";
  import SideCard from "./SideCard/SideCard.svelte";

  let moveTop = "15px";
  $: if ($_app.sidebar?.cardInfo?.show) {
    moveTop = "130px";
  } else {
    moveTop = "15px";
  }
</script>

<div id="sidecards" class="p-3" style="position: relative; top: {moveTop};">
  {#each $_cards as card (card.id)}
    <SideCard bind:card />
  {/each}
</div>

<style>
  #sidecards {
    margin-bottom: 350px;
  }
</style>
