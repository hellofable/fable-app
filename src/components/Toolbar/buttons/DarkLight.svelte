<script>
  import { onMount } from "svelte";
  import { _app } from "$lib";
  export let roundedClass = "";

  function toggle() {
    $_app.view.dark = !$_app.view.dark;
  }
</script>

<button
  on:click={() => {
    toggle();
  }}
  class="btn {roundedClass}"
>
  {#if $_app.view.dark}
    <i class="bi bi-sun"></i>
  {:else}
    <i class="bi bi-moon"></i>
  {/if}
</button>
