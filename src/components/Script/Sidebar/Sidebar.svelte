<script>
  import { _app } from "$lib";
  import SideCards from "./SideCards/SideCards.svelte";
  import Overlay from "./Overlay/Overlay.svelte";
</script>

<div
  class:d-none={!$_app.sidebar.show}
  class="script-sidebar overflow-y-auto h-100 pointer"
>
  <div class="flex-grow-1">
    <Overlay />

    <SideCards />
  </div>
</div>

<style>
  .script-sidebar {
    flex: 0 0 355px;
  }
</style>
