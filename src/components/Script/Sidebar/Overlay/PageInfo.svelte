<script>
  export let card;

  function roundToNearestQuarter(num) {
    return Math.round(num * 4) / 4;
  }

  let numberOfPages = 0;
  $: if (card) {
    numberOfPages = roundToNearestQuarter(card.pages.count);
  }
</script>

{#if card}
  <ul class="list-group">
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Number of Pages
      <span class="badge bg-primary rounded-pill border-0">
        {#if numberOfPages > 0}
          {numberOfPages}
        {:else}
          &lt; 0.25
        {/if}
      </span>
    </li>
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Starts On Page
      <span class="badge bg-success rounded-pill border-0">
        {Math.floor(card.pages.prevRunningCount) + 1}
      </span>
    </li>
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Ends On Page
      <span class="badge bg-danger rounded-pill border-0">
        {Math.floor(card.pages.runningCount) + 1}
      </span>
    </li>
  </ul>
{/if}

<style>
  .list-group-item {
    padding: 0 0.5rem;
  }

  .list-group-item {
    font-size: 14px;
  }
</style>
