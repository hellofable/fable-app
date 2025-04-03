<script>
  import { onMount } from "svelte";
  let isFull = false;
  export let roundedClass = "";

  onMount(() => {
    document.addEventListener("fullscreenchange", () => {
      isFull = document.fullscreenElement ? true : false;
    });
  });

  function fullscreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }

  let hasFullscreen = false;
  onMount(() => {
    if (document.documentElement.requestFullscreen) {
      hasFullscreen = true;
    }
  });
</script>

{#if hasFullscreen}
  <button
    class:selected={isFull}
    on:click={fullscreen}
    class="btn {roundedClass}"
  >
    <i class="bi bi-fullscreen"></i>
  </button>
{/if}
