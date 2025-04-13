<script>
  export let card;
</script>

{#if card}
  <div class="w-100">
    <div class="title fw-bold px-2 pt-1">
      {card.firstLine.textContentNoMarkup}
    </div>
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
