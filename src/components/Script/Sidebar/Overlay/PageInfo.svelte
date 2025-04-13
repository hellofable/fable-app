<script>
  export let card;

  $: console.log(card.pages);
</script>

{#if card}
  <script>
    export let card;
  </script>

  {#if card}
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item border-0 d-flex justify-content-between align-items-center"
      >
        Scene Length
        <span class="badge bg-primary rounded-pill border-0">20 Pages</span>
      </li>
      <li
        class="list-group-item border-0 d-flex justify-content-between align-items-center"
      >
        Starts On Page
        <span class="badge bg-success rounded-pill border-0">20</span>
      </li>
      <li
        class="list-group-item border-0 d-flex justify-content-between align-items-center"
      >
        Ends On Page
        <span class="badge bg-danger rounded-pill border-0">40</span>
      </li>
    </ul>
  {/if}
{/if}

<style>
  .list-group-item {
    padding: 0 0.5rem;
  }

  .list-group-item {
    font-size: 15px;
  }
</style>
