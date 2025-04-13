<script>
  export let card;

  function roundToNearestQuarter(num) {
    return Math.round(num * 4) / 4;
  }

  let numberOfPages = 0;
  let startPage = 0;
  let endPage = 0;

  $: startPage = roundToNearestQuarter(card.pages.prevRunningCount);
  $: endPage = getEndPage(card);

  function getEndPage(card) {
    const descendants = card.dependencyInfo.descendants;
    const lastDescendant = descendants[descendants.length - 1];

    return roundToNearestQuarter(lastDescendant.pages.runningCount);
  }

  $: numberOfPages = endPage - startPage;
</script>

{#if card}
  <ul class="list-group">
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Number of Pages
      <span class="badge bg-primary rounded-pill border-0">
        {numberOfPages}
      </span>
    </li>
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Starts On Page
      <span class="badge bg-success rounded-pill border-0">
        {startPage}
      </span>
    </li>
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Ends On Page
      <span class="badge bg-danger rounded-pill border-0">
        {endPage}
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
