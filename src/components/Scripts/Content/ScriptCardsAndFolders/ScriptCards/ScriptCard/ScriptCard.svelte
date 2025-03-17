<script>
  export let script;

  import { router } from "tinro";

  import Dropdown from "./Dropdown/Dropdown.svelte";

  function click() {
    router.goto("/script/" + script.id); // Navigate to a new route
  }
</script>

<div
  role="button"
  aria-label="View script synopsis"
  on:click={click}
  on:keydown={(e) => (e.key === "Enter" || e.key === " " ? click() : null)}
  tabindex="0"
  class="script-card rounded overflow-hidden position-relative"
>
  <Dropdown {script} />
  <div class="d-flex h-100 flex-column pb-2 overflow-y-auto">
    <div class=" ps-3 pt-3 fs-5">
      <div
        role="button"
        aria-label="View script title"
        on:click={click}
        on:keydown={(e) =>
          e.key === "Enter" || e.key === " " ? click() : null}
        tabindex="0"
        class=" script-title"
      >
        {script.title}
      </div>
    </div>

    <div class="flex-grow-1 synopsis px-3">
      {script.synopsis || ""}
    </div>
  </div>
</div>

<style>
  .synopsis {
    line-height: 1.1;
    font-size: 13px;
  }

  .script-title {
    max-width: 90%;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 10px;
  }
</style>
