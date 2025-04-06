<script>
  import { onMount } from "svelte";
  export let isOpen;
  function click(event) {
    event.stopPropagation();
    event.preventDefault();
    isOpen = !isOpen;
  }
</script>

<div>
  <button class="btn btn-secondary" on:click={click}>
    {#if isOpen}
      <i class="bi bi-chevron-down"></i>
    {:else}
      <i class="bi bi-chevron-right"></i>
    {/if}
  </button>
</div>
