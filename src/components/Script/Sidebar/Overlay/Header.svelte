<script>
  export let card;
</script>

{#if card}
  <div class="w-100 p-2">
    <div class="title fw-bold">{card.firstLine.textContentNoMarkup}</div>
  </div>
{/if}

<style>
  .title {
    white-space: nowrap; /* Prevents the text from wrapping to the next line */
    overflow: hidden; /* Ensures that excess content is not visible */
    text-overflow: ellipsis; /* Adds an ellipsis (...) at the end of the truncated text */
    max-width: 100%; /* Set a maximum width; can be a specific px/em value or percentage */
    display: inline-block;
  }
</style>
