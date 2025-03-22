<script>
  import { meta } from "tinro";
  const route = meta();

  import ScriptCard from "./ScriptCard/ScriptCard.svelte";
  export let scriptCardCount;
  import { _scripts, _user } from "$lib";

  let sortedScripts = [];
  $: if ($_scripts && $_scripts.filter) {
    sortedScripts = Array.from(
      new Map(
        $_scripts
          .filter(
            (script) =>
              !script.deleted &&
              $_user.id === script.ownerId &&
              (script?.folderId === $route?.params?.folderId ||
                (!$route?.params?.folderId && script?.folderId === "root"))
          )
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((script) => [script.id, script])
      ).values()
    );
  }

  $: scriptCardCount = sortedScripts.length;
</script>

{#each sortedScripts as script (script.id)}
  <ScriptCard {script} />
{/each}
