<script>
  import { _app } from "$lib";
  import LoadingSpinner from "/src/components/Other/IsAuthenticatingSpinner.svelte";
</script>

{#if $_app.isLoadingBackup}
  <div class="loading-container">
    <LoadingSpinner />
  </div>
{/if}
