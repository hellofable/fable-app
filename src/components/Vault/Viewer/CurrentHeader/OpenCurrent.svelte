<script>
  export let script;
</script>

<a
  on:click={null}
  href="/script/{$script.id}"
  class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small"
>
  Open Current
</a>

<style>
  a {
    cursor: pointer;
  }
</style>
