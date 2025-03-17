<script>
  export let folder;
  import { router } from "tinro";

  import Dropdown from "./Dropdown/Dropdown.svelte";

  function click() {
    router.goto("/scripts/folder/" + folder.id); // Navigate to a new route
  }
</script>

<div class="folder-card rounded overflow-hidden">
  <!-- Parent clickable area -->
  <div
    role="button"
    aria-label={`Open folder ${folder.name}`}
    on:click={click}
    on:keydown={(e) => (e.key === "Enter" || e.key === " " ? click() : null)}
    tabindex="0"
    class="folder-card-btn"
  >
    <!-- Folder name -->
    <div
      class="fs-5 secondary-text-emphasis position-absolute top-50 start-50 translate-middle text-center"
    >
      <div class="folder-text">
        <i class="bi bi-folder"></i>
        {folder.name}
      </div>
    </div>
  </div>

  <!-- Dropdown menu -->
  <Dropdown {folder} />
</div>

<style>
  .secondary-text-emphasis {
    color: var(--bs-gray-600);
  }

  .folder-card-btn {
    height: 100%;
    width: 100%;
  }

  .folder-text {
    position: relative;
    top: -10px;
    font-size: 18px;
  }
</style>
