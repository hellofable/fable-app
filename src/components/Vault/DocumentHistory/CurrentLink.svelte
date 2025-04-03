<script>
  export let script;
</script>

{#if script.hasOpened}
  <a href="/scripts?backupId={script.id}_" class="text-muted">Current</a>
{/if}

<style>
  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
