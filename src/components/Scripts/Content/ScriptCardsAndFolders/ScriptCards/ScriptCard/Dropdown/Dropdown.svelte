<script>
  import { _app } from "$lib";
  import EditScriptButton from "./EditScriptButton.svelte";
  import MoveScriptButton from "./MoveScriptButton.svelte";
  import TrashScriptButton from "./TrashScriptButton.svelte";

  export let script;

  function open(e) {
    e.stopPropagation();
  }
</script>

<div class="btn-group dropstart">
  <button
    on:click={open}
    class="btn btn-link p-3"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i class="bi bi-three-dots-vertical"></i>
  </button>
  <ul class="dropdown-menu rounded-0 border-0 shadow-sm">
    <li><EditScriptButton {script} /></li>
    <li><TrashScriptButton {script} /></li>
    <li><hr class="dropdown-divider" /></li>
    <MoveScriptButton folder={script} />
  </ul>
</div>

<style>
  .dropstart {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
  }

  .dropdown-menu {
    position: relative;
    top: 20px !important;
  }
</style>
