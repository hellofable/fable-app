<script>
  import AddScreenplayLink from "./DropdownItems/AddScreenplayLink.svelte";
  import AddFolderLink from "./DropdownItems/AddFolderLink.svelte";
  import ImportTextLink from "./DropdownItems/ImportTextLink.svelte";
  import StoryBuilder from "./DropdownItems/StoryBuilder.svelte";
</script>

<div class="dropdown m-0 p-0">
  <button
    style="min-height: 38px;min-width:100px;"
    class="btn btn-primary m-0"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    New <i class="ms-2 bi bi-plus-circle-dotted"></i>
  </button>
  <ul class="dropdown-menu rounded-0 border-0 shadow-sm">
    <li>
      <AddScreenplayLink />
      <AddFolderLink />
      <hr class="dropdown-divider" />
      <ImportTextLink />
      <hr class="dropdown-divider" />
      <StoryBuilder />
    </li>
  </ul>
</div>
