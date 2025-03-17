<script>
  export let menu;
  import { router } from "tinro";
  import { _app, _user, exportAsText, exportAsPdf, pb } from "$lib";

  // A reactive statement to subscribe to changes in the _app setting
  $: viewMode = $_app.view.mode;

  async function click(item) {
    if (item.id === "logout") pb.auth.logout();
    if (item.id === "cards") $_app.view.mode = "cards";
    if (item.id === "script") $_app.view.mode = "script";
    if (item.id === "text") $_app.view.mode = "text";
    if (item.id === "exportText") exportAsText();
    if (item.id === "exportPdf") exportAsPdf();

    if (item.id === "sub") {
      router.goto("/scripts");

      $_app.scriptsSidebar.bottomButtons.selected = "Account";
      $_app.scriptsSidebar.show = true;
    }
  }
</script>

<div
  class="{menu.name}-dropdown dd-wrapper d-flex align-items-center dd pointer"
>
  <div class="dropdown dropend">
    <button
      class="btn"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class={menu.icon}></i>
    </button>
    <ul
      class="dropdown-menu dropdown-menu-end"
      aria-labelledby="dropdownMenuButton"
    >
      {#each menu.items as item}
        {#if item.divider}
          <hr class="dropdown-divider" />
        {:else}
          <li>
            <a
              on:click={() => {
                click(item);
              }}
              class="dropdown-item d-flex justify-content-between"
              href={null}
            >
              <span>{item.name}</span>
              {#if item.selected}
                <i class="bi bi-check-circle-fill text-success"></i>
              {/if}
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</div>

<style>
  .dropdown-menu {
    border-radius: 0 !important;
  }

  a.dropdown-item {
    cursor: pointer;
  }
</style>
