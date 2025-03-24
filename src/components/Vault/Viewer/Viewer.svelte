<script>
  import {
    _app,
    pbCheckpoints,
    pb,
    _route,
    _scripts,
    convertYStateToProsemirror,
  } from "$lib";
  import { derived, writable } from "svelte/store";

  import Loading from "./Loading.svelte";
  import CheckpointHeader from "./CheckpointHeader.svelte";
  import CurrentHeader from "./CurrentHeader/CurrentHeader.svelte";
  import Editor from "./Editor/Editor.svelte";

  // Writable store for checkpoint data
  const checkpoint = writable(null);
  let file = "";

  // Fetch checkpoint data when _app.backupId changes
  $: if ($_route.query.backupId) {
    const { backupId } = $_route.query;
    if (!backupId.endsWith("_")) loadCheckpoint(backupId);
    if (backupId.endsWith("_")) loadCurrent(backupId);
  }

  async function loadCurrent(backupId) {
    $_app.isLoadingBackup = true;
    file = "";
    const scriptId = backupId.split("_")[0];
    $checkpoint = { scriptId };
    const doc = await pb.db.states.getOneByScriptId({ docId: scriptId });
    const json = convertYStateToProsemirror(doc.data.state);
    const jsonString = JSON.stringify(json);
    file = jsonString;
    setTimeout(() => {
      $_app.isLoadingBackup = false;
    }, 1000);
  }

  // called from reactive statement above
  async function loadCheckpoint(docId) {
    $_app.isLoadingBackup = true;
    file = null;
    try {
      let response = await pbCheckpoints.get({ docId });

      if (response.data) {
        checkpoint.set(response.data.checkpoint);
        file = response.data.file;

        setTimeout(() => {
          $_app.isLoadingBackup = false;
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching checkpoint:", error);
    }
  }

  const script = derived([checkpoint, _scripts], ([$checkpoint, $scripts]) => {
    if (!$checkpoint || !$scripts) return {};
    return $scripts.find((script) => script.id === $checkpoint.scriptId) || {};
  });

  $: console.log($checkpoint);
</script>

<div
  class:d-none={!$_route.query.backupId}
  class="viewer shadow d-flex flex-column scroller"
>
  <Loading />

  {#if $checkpoint?.collectionName == "checkpoints"}
    <CheckpointHeader {checkpoint} {script} {file} />
  {/if}

  {#if $checkpoint?.collectionName != "checkpoints"}
    <CurrentHeader {checkpoint} {script} {file} />
  {/if}

  {#if file && $script.id}
    <Editor json={file} {script} />
  {/if}
</div>

<style>
  .viewer {
    top: 0;
    position: absolute;
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
</style>
