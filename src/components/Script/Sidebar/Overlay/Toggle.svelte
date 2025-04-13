<script>
  import { _app } from "$lib";

  function toggle() {
    $_app.sidebar.cardInfo.show = !$_app.sidebar.cardInfo.show;
  }
</script>

<div class="options-toggle w-100 text-center pointer">
  <button on:click={toggle} class="btn btn-sm p-0 m-0 w-100 border-0">
    {#if $_app.sidebar?.cardInfo?.show}
      <i class="bi bi-caret-down-fill"></i>
    {/if}
    {#if !$_app.sidebar.cardInfo?.show}
      <i class="bi bi-caret-up-fill"></i>
    {/if}
  </button>
</div>

<style>
  .options-toggle {
    background: rgb(79 100 79 / 7%);
  }
  .btn {
    text-decoration: none;
    color: unset;
  }
</style>
