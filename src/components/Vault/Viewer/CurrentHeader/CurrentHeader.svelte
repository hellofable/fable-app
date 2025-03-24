<script>
  import { dateFormat, timeAgo } from "$lib";

  import Close from "../Close.svelte";
  import OpenCurrent from "./OpenCurrent.svelte";

  export let script;
</script>

<div class="viewer-header p-3 rounded">
  <div class="d-flex w-100">
    <div class="close">
      <Close />
    </div>
    <div class="text-end flex-grow-1">
      {#if $script.id}
        <div class="text-secondary fw-bold fs-4">{$script.title}</div>
        <div>{dateFormat($script.updated)}</div>
        <div class="small text-muted">{timeAgo($script.updated)}</div>
      {/if}
    </div>
  </div>
  <div class="text-end mt-2">
    {#if $script.id}
      <OpenCurrent {script} />
    {/if}
  </div>
</div>
