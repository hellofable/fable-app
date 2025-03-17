<script>
  import { _folders } from "$lib";
  import { get } from "svelte/store";
  import { meta } from "tinro";
  const route = meta();

  let breadcrumbs = [];
  let folderId;

  $: folderId = $route?.params?.folderId;

  $: if ($_folders) {
    updateBreadcrumbs(folderId);
  } else if (get(_folders).length) {
    updateBreadcrumbs("root");
  }

  async function updateBreadcrumbs(folderId) {
    breadcrumbs = [];
    let currentFolderId = folderId;

    while (currentFolderId && currentFolderId !== "root") {
      const folder = get(_folders).find(
        (folder) => folder.id === currentFolderId
      );
      if (!folder) break;

      // Add the current folder to the breadcrumbs
      breadcrumbs.unshift(folder);

      // Move up to the parent folder
      currentFolderId = folder.folderId; // Assume folders have a `parentId` field
    }

    // Add "Home" as the root breadcrumb
    breadcrumbs.unshift({ name: "Your Scripts", id: "root" });
  }
</script>

<div class="d-flex align-items-center w-100">
  <nav aria-label="breadcrumb" class="rounded breadcrumbs p-2 flex-grow-1">
    <div class="d-flex align-items-center ps-2">
      <ol class="breadcrumb m-0 p-0 flex-grow-1">
        {#each breadcrumbs as breadcrumb, i}
          <li
            class="breadcrumb-item {i === breadcrumbs.length - 1
              ? 'active'
              : ''}"
            aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
          >
            {#if breadcrumb.id === "root"}
              {#if breadcrumbs && breadcrumbs.length > 1}
                <a href="/scripts">{breadcrumb.name}</a>
              {/if}
              {#if breadcrumbs && breadcrumbs.length == 1}
                <div class="fw-bold">{breadcrumb.name}</div>
              {/if}
            {:else if i !== breadcrumbs.length - 1}
              <a href={`/scripts/folder/${breadcrumb.id}`}>
                <i class="bi bi-folder small"></i>
                {breadcrumb.name}
              </a>
            {:else}
              <i class="bi bi-folder small"></i> {breadcrumb.name}
            {/if}
          </li>
        {/each}
      </ol>
    </div>
  </nav>
</div>

<style>
  a {
    text-decoration: none;
    opacity: 0.8;
    font-weight: bold;
  }
</style>
