<script>
  import { _scripts, _user, _folders, _app } from "$lib";
  import FolderCard from "./FolderCard/FolderCard.svelte";
  import { meta } from "tinro";
  const route = meta();

  export let folderCardCount;

  let sortedFolders = [];
  $: if ($_folders && $_folders.length) {
    sortedFolders = Array.from(
      new Map(
        $_folders
          .filter(
            (folder) =>
              !folder.inTrash &&
              (folder.folderId === $route.params.folderId ||
                (!$route.params.folderId && folder.folderId === "root"))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((folder) => [folder.id, folder])
      ).values()
    );
  }

  $: if ($_folders.length == 0) sortedFolders = [];
  $: folderCardCount = sortedFolders.length;
</script>

{#each sortedFolders as folder (folder.id)}
  <FolderCard {folder} />
{/each}
