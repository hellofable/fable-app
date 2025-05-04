<script>
  export let card;

  function roundToNearestQuarter(num) {
    return Math.round(num * 4) / 4;
  }

  let numberOfPages = 0;
  let startPage = 0;
  let endPage = 0;

  // Defensive check for card and its pages property
  $: startPage =
    card && card.pages ? roundToNearestQuarter(card.pages.prevRunningCount) : 0;
  $: endPage = card ? getEndPage(card) : 0;

  function getEndPage(card) {
    if (
      !card.dependencyInfo ||
      !card.dependencyInfo.descendants ||
      card.dependencyInfo.descendants.length === 0
    ) {
      return 0;
    }

    const descendants = card.dependencyInfo.descendants;
    const lastDescendant = descendants[descendants.length - 1];

    // Defensive check for lastDescendant and its pages property
    if (!lastDescendant || !lastDescendant.pages) {
      return 0;
    }

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
        {Math.floor(startPage + 1)}
      </span>
    </li>
    <li
      class="list-group-item border-0 d-flex justify-content-between align-items-center"
    >
      Ends On Page
      <span class="badge bg-danger rounded-pill border-0">
        {Math.floor(endPage + 1)}
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
