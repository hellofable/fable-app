<script>
  import { dateFormat, timeAgo } from "$lib";
  import RestoreRevision from "./RestoreRevision.svelte";
  import DeleteRevision from "./DeleteRevision.svelte";
  import Close from "./Close.svelte";

  export let checkpoint;
  export let script;
  export let file;
</script>

<div class="viewer-header p-3 rounded">
  <div class="d-flex w-100">
    <div class="close">
      <Close />
    </div>

    <div class="text-end flex-grow-1">
      {#if $script.id && $checkpoint.id}
        <div class="text-secondary fw-bold fs-4">{$script.title}</div>
        <div class=" fw-x">{dateFormat($checkpoint.created)}</div>
        <div class="small text-muted">{timeAgo($checkpoint.created)}</div>
      {/if}
    </div>
  </div>
  <div class="text-end mt-2">
    {#if $script.id && $checkpoint.id}
      <RestoreRevision backup={checkpoint} {script} {file} />
      <DeleteRevision backup={checkpoint} />
    {/if}
  </div>
</div>
