<script>
  import { router } from "tinro";
  function home() {
    router.goto("/scripts");
  }
</script>

<button on:click={home} class="btn">
  <i class="bi bi-arrow-left-square"></i>
</button>

<style>
</style>
