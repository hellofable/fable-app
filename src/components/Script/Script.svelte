<script>
  import { _user, _app, _cards } from "$lib";

  import ToolBar from "../Toolbar/Toolbar.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";

  import { onMount, onDestroy } from "svelte";
  import Editor from "./Editor/Editor.svelte";
  import ArchivedAlert from "./ArchivedAlert.svelte";

  export let script;

  onDestroy(() => {
    _cards.set([]);
  });

  onMount(() => {
    $_app.isLoadingScript = true;
  });
</script>

{#if script}
  <div id="workspace" class="h-100 overflow-none d-flex">
    <ToolBar />
    <Sidebar />
    <div id="editor-wrapper">
      {#if script.deleted}
        <ArchivedAlert {script} />
      {/if}
      <Editor {script} />
    </div>
  </div>
{/if}

<style>
  #editor-wrapper {
    flex: 1;
    overflow-y: auto;
  }
</style>
