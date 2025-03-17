<script>
  import { router } from "tinro";
</script>

<button on:click={() => router.goto("/scripts")} class="btn btn-link m-0 p-0">
  <i class="bi bi-x-lg"></i></button
>

<style>
  .btn-link,
  .btn-link:hover,
  .btn-link:active,
  .btn-link:focus {
    color: unset;
  }

  .btn-link {
    opacity: 0.5;
  }
</style>
