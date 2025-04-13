<script>
  export let card;

  $: console.log(card);
</script>

{#if card}
  <div class="w-100 p-2">
    <div class="title">{card.firstLine.textContentNoMarkup}</div>
  </div>
{/if}

<style>
  .title {
    overflow: hidden;
    white-space: nowrap;
  }
</style>
