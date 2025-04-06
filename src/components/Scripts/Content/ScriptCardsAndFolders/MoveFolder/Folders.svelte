<script>
  import Folder from "./Folder.svelte";
  import HomeButton from "./HomeButton.svelte";
  import { _folders } from "$lib";
  export let folderId;
  export let fields;

  let filtered = [];

  $: if ($_folders?.length) {
    filtered = $_folders.filter((folder) => {
      3;
      return folder.folderId == folderId;
    });
  }
</script>

{#if folderId == "root"}
  <HomeButton />
{/if}

{#if filtered.length > 0}
  {#each filtered as folder, index}
    {#if folder.id !== fields.folderId}
      <div class="ms-2">
        <Folder {folder} {fields} />
      </div>
    {/if}
  {/each}
{/if}
