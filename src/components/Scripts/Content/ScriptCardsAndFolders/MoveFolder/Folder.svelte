<script>
  import { _modal } from "$lib";
  export let folder;
  export let fields;
  import Folders from "./Folders.svelte";
  import CollapseToggle from "./CollapseToggle.svelte";
  let isOpen = false;

  function click(event) {
    event.stopPropagation();
    event.preventDefault();

    $_modal.selectedFolder = folder.id;
  }
</script>

<div class="d-flex ps-1 align-items-center mb-1">
  <div class="me-2"><CollapseToggle bind:isOpen /></div>
  <button on:click={click} class="border p-1 rounded btn-link border-0">
    {folder.name}
    {#if $_modal.selectedFolder === folder.id}
      <span class="badge bg-primary ms-2">Move Here</span>
    {/if}
  </button>
</div>

{#if isOpen}
  <Folders folderId={folder.id} {fields} />
{/if}
