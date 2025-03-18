<script>
  import { derived, writable } from "svelte/store";
  import { _app, pbCheckpoints, dateFormat, timeAgo, _route } from "$lib";
  import { _scripts } from "$lib";

  import RestoreRevision from "./RestoreRevision.svelte";
  import DeleteRevision from "./DeleteRevision.svelte";
  import Close from "./Close.svelte";
  import Editor from "./Editor/Editor.svelte";

  // Writable store for checkpoint data
  const checkpoint = writable(null);
  let file = "";
  let hidden = true;

  // Fetch checkpoint data when _app.backupId changes
  $: if ($_route.query.backupId) {
    setCheckpoint($_route.query.backupId);
  }

  async function setCheckpoint(docId) {
    try {
      let response = await pbCheckpoints.get({ docId });

      if (response.data) {
        checkpoint.set(response.data.checkpoint);
        file = response.data.file;

        hidden = true;
        setTimeout(() => {
          hidden = false;
        }, 100);
      }
    } catch (error) {
      console.error("Error fetching checkpoint:", error);
    }
  }

  // Derived store: Automatically updates when checkpoint or _scripts change
  const script = derived([checkpoint, _scripts], ([$checkpoint, $scripts]) => {
    if (!$checkpoint || !$scripts) return {};
    return $scripts.find((script) => script.id === $checkpoint.scriptId) || {};
  });
</script>

<div
  class:d-none={!$_route.query.backupId}
  class="viewer shadow d-flex flex-column scroller"
>
  {#if checkpoint && file && !hidden}
    <div class="viewer-header p-3 rounded">
      <div class="d-flex w-100">
        <div class="close">
          <Close />
        </div>

        <div class="text-end flex-grow-1">
          <div class="text-secondary fw-bold fs-4">{$script.title}</div>
          <div class=" fw-x">{dateFormat(checkpoint.created)}</div>
          <div class="small text-muted">{timeAgo(checkpoint.created)}</div>
        </div>
      </div>
      <div class="text-end mt-2">
        <RestoreRevision backup={checkpoint} {script} {file} />
        <DeleteRevision backup={checkpoint} />
      </div>
    </div>

    <div class=" flex-shrink-1 flex-grow-1 mt-2 px-2">
      <Editor json={file} />
    </div>
  {/if}
</div>

<style>
  .viewer {
    top: 0;
    position: fixed;
    right: 0;
    width: 500px;
    max-width: 100%;
    height: 100vh;
    background: var(--bs-body-bg);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .scroller {
    overflow-y: auto;
    flex-grow: 1; /* Allow scroller to grow and take up remaining space */
  }

  .viewer-header {
    background: rgba(128, 128, 128, 0.059);
  }
</style>
