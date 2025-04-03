<script>
  export let script;
  import { pb } from "$lib";

  function click() {
    pb.db.scripts.update(script.id, { deleted: false });
  }
</script>

<div
  class="alert alert-warning d-flex align-items-center justify-content-between"
  role="alert"
>
  <div class="ms-2">This script is archived.</div>
  <a on:click={click} href={null}>RESTORE</a>
</div>
