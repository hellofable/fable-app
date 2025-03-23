<script>
  import SharedCard from "./SharedCard.svelte";
  import { meta } from "tinro";
  const route = meta();

  import { _scripts, _user, _app } from "$lib";
  import Toggle from "./Toggle.svelte";
  export let hasSharedScripts;
  let sharedScripts = [];

  // sort and filter folders and scipts by folderId & inTrash
  $: if ($_scripts && $_scripts?.filter) {
    sharedScripts = Array.from(
      new Map(
        $_scripts
          .filter((script) => !script.inTrash && $_user.id !== script.ownerId)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((script) => [script.id, script])
      ).values()
    );
  }
</script>

<div
  class:d-none={$route?.params?.folderId}
  class="d-flex align-items-center mx-2 mt-2"
>
  <Toggle {hasSharedScripts} />
  <div class="rounded breadcrumbs fw-bold flex-grow-1 p-2 ps-3">
    Shared with You
  </div>
</div>

<div class:d-none={!$_app.scripts.showShared} class="grid mt-2 px-2">
  {#each sharedScripts as script (script.id)}
    <SharedCard {script} inFolder={$route?.params?.folderId} />
  {/each}
</div>
