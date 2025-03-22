<script>
  import { _app } from "$lib";
  export let roundedClass = "";

  function click() {
    $_app.view.hideNonPrinting = !$_app.view.hideNonPrinting;
  }
</script>

<button on:click={click} class="btn {roundedClass}">
  {#if !$_app.view.hideNonPrinting}
    <i class="bi bi-eye"></i>
  {/if}

  {#if $_app.view.hideNonPrinting}
    <i class="bi bi-eye-slash"></i>
  {/if}
</button>
