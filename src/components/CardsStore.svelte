<script>
  import { _cards, _app } from "$lib";
  let show = false;
</script>

<div class="store-wrapper">
  <button
    class="btn btn-link"
    on:click={() => {
      show = !show;
    }}>Store</button
  >
  {#if show}
    <div class:bg-dark={show} class:d-none={!show}>
      {$_cards.length}
      <pre> {JSON.stringify($_cards, null, 2)}</pre>
    </div>
  {/if}
</div>

<style>
  pre {
    white-space: pre-wrap; /* Enables wrapping */
    word-break: break-word; /* Breaks words if they’re too long */
    width: 80vw;
    height: 200px;
  }

  .store-wrapper {
    position: absolute;
    z-index: 2;
    top: 50px;
    right: 100px;

    color: white !important;
  }

  button {
    background: black;
    opacity: 0.5;
  }
</style>
