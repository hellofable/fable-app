<script>
  import { pbCheckpoints } from "$lib";
  import RestoreButton from "./Buttons/RestoreButton.svelte";
  import DeleteButton from "./Buttons/DeleteButton.svelte";
  import CurrentLink from "./CurrentLink.svelte";
  import Items from "./Items.svelte";
  import { onMount } from "svelte";

  export let isCollapsed;
  export let script;
  let isLoading = false;

  let items = [];
  let onLastPage = false;

  const batchSize = 4;

  $: if (!isCollapsed) {
    getRecent();
  } else {
    items = [];
    currentPage = 1;
    onLastPage = false;
  }

  async function getRecent() {
    isLoading = true;
    const newItems = await pbCheckpoints.getBackups(
      script.id,
      currentPage,
      batchSize
    );
    items = newItems;
    isLoading = false;

    if (newItems.length === batchSize) {
      onLastPage = false;
    } else {
      onLastPage = true;
    }
  }

  let currentPage = 1;
  async function getOlder() {
    isLoading = true;

    const newItems = await pbCheckpoints.getBackups(
      script.id,
      currentPage,
      batchSize
    );
    const hasMore = await pbCheckpoints.getBackups(
      script.id,
      currentPage,
      batchSize + 1
    );

    if (currentPage === 1) {
      items = newItems;
    } else {
      items = [...items, ...newItems];
    }
    if (!hasMore.length) {
      onLastPage = true;
    }
    isLoading = false;
  }

  function getNextPage() {
    currentPage++;
    getOlder();
  }
</script>

<div class="px-3 pb-3 small">
  <CurrentLink {script} />
  <Items {items} />
  <div class="d-flex w-100 align-items-end mt-2">
    <div class="flex-grow-1">
      <a
        on:click={getNextPage}
        href={null}
        class:disabled={onLastPage || items.length === 0}
        class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small mt-2 opacity-75"
      >
        <!-- svelte-ignore empty-block -->
        {#if onLastPage}
          No More Backups
        {:else if items.length}
          {#if isLoading}
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          {:else}
            Load more
          {/if}
        {:else if isLoading}
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        {:else}
          No Backups
        {/if}
      </a>
    </div>

    <div class="opacity-75">
      <RestoreButton {script} />
      <DeleteButton {script} />
    </div>
  </div>
</div>

<style>
  a {
    text-decoration: none;
    cursor: pointer;
  }

  .backup a:hover {
    text-decoration: underline;
  }

  .disabled {
    pointer-events: none !important;
    color: grey !important;
    text-decoration: none !important;
  }
</style>
