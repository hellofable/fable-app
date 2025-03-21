<script>
  import { _scripts, _app } from "$lib";
  import VaultOptions from "./VaultOptions/VaultOptions.svelte";

  let scriptsSorted = [];

  $: if ($_scripts && $_scripts.sort) {
    scriptsSorted = $_scripts.sort((a, b) => b.scriptNumber - a.scriptNumber);
  }

  // import VaultOptions from './VaultOptions/VaultOptions.svelte';
  import VaultCard from "./VaultCard/VaultCard.svelte";
  import { scripts } from "$lib/pb/db/collections";
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
