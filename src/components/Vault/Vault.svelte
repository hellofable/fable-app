<script>
  import { _scripts, _app } from "$lib";
  import VaultOptions from "./VaultOptions/VaultOptions.svelte";
  import VaultCard from "./VaultCard/VaultCard.svelte";
  import { router } from "tinro";
  import { onMount } from "svelte";

  let scriptsSorted = [];

  $: if ($_scripts && $_scripts.sort) {
    scriptsSorted = $_scripts.sort((a, b) => b.scriptNumber - a.scriptNumber);
  }

  // Close the viewer if the user clicks outside of it
  onMount(() => {
    document.addEventListener("click", (event) => {
      const allowedTags = ["A", "BUTTON", "INPUT"];
      if (allowedTags.includes(event.target.tagName)) return;

      // Check if the clicked element is inside an element with class .viewer
      if (!event.target.closest(".viewer")) {
        const url = new URL(window.location.href);
        if (url.search) {
          // Only update if query parameters exist
          router.goto(url.pathname, { replaceState: true });
        }
      }
    });
  });
</script>

<div
  class:d-none={$_app.scriptsSidebar.bottomButtons.selected !== "Vault"}
  class="d-flex flex-column h-100"
>
  <VaultOptions />
  <div class="flex-grow-1 overflow-auto pt-2 ps-2 pe-0">
    <p class="alert alert-secondary text-secondary d-none">
      Vault is empty. Your documents will be backed up here when enabled.
    </p>
    {#each scriptsSorted as script (script.id)}
      <div class="mb-1"><VaultCard {script} /></div>
    {/each}
  </div>
</div>
