<script>
  export let script, inFolder;
  import { router } from "tinro";

  function click() {
    router.goto("/script/" + script.id); // Navigate to a new route
  }
</script>

<div
  class:d-none={inFolder}
  class="script-card rounded overflow-hidden position-relative"
>
  <div class="d-flex h-100 flex-column">
    <h5 class="px-4 pt-3">
      <div
        role="button"
        aria-label="View script title"
        on:click={click}
        on:keydown={(e) =>
          e.key === "Enter" || e.key === " " ? click() : null}
        tabindex="0"
        class="secondary-text-emphasis"
      >
        {script.title}
      </div>
    </h5>
    <div
      role="button"
      aria-label="View script synopsis"
      on:click={click}
      on:keydown={(e) => (e.key === "Enter" || e.key === " " ? click() : null)}
      tabindex="0"
      class="flex-grow-1 overflow-y-scroll synopsis px-4 pb-4 mb-2"
    >
      {script.synopsis || ""}
    </div>
  </div>
</div>

<style>
  .synopsis {
    line-height: 1.1;
    font-size: 13px;
  }
  .secondary-text-emphasis {
    color: var(--bs-secondary-text-emphasis);
    font-weight: 600;
  }
</style>
