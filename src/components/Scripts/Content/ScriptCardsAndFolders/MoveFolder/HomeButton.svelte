<script>
  import { _modal } from "$lib";
  function click(event) {
    event.stopPropagation();
    event.preventDefault();

    $_modal.selectedFolder = "home";
  }
</script>

<button on:click={click} class="border p-1 rounded btn-link border-0">
  Home

  {#if $_modal.selectedFolder === "home"}
    <span class="badge bg-primary ms-2">Move Here</span>
  {/if}
</button>
<div class="mb-2"></div>
