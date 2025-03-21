<script>
  import { _app, _scripts, _user } from "$lib";
  import ScriptCardsAndFolders from "./ScriptCardsAndFolders/ScriptCardsAndFolders.svelte";
  import SharedCards from "./SharedCards/SharedCards.svelte";

  // Check if the user has shared scripts
  $: hasSharedScripts = Array.isArray($_scripts)
    ? $_scripts.some(
        (script) => !script.inTrash && $_user.id !== script.ownerId
      )
    : false;
</script>

<div id="scripts-content" class="h-100 overflow-auto">
  <ScriptCardsAndFolders {hasSharedScripts} />
  <div class:d-none={!hasSharedScripts}><SharedCards {hasSharedScripts} /></div>
</div>
