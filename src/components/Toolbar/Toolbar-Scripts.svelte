<script>
  import { _app } from "$lib";
  import DarkLight from "./buttons/DarkLight.svelte";
  import FullScreenButton from "./buttons/FullScreenButton.svelte";
  import fableLogo from "/src/assets/xxx.svg";

  function handleClick() {
    $_app.scriptsSidebar.show = !$_app.scriptsSidebar.show;
  }
</script>

<div class="d-flex align-items-center toolbar">
  <button on:click={handleClick} class="btn">
    <i class="bi bi-layout-sidebar"></i>
  </button>
  <!-- Flex-grow to push the content apart -->
  <div class="me-4 ms-2"></div>
  <div class="flex-grow-1"></div>

  <!-- Logo element -->

  <!-- Flex-grow to push content to the right side -->
  <div class="flex-grow-1"></div>

  <a href="/scripts" class="logo-container pe-2">
    <img class="logo" src={fableLogo} alt="Fable" width="60" />
  </a>
  <div class="mx-1"><FullScreenButton /></div>
  <div><DarkLight /></div>
</div>

<style>
  .logo-container {
    font-family: "Megrim", serif;
    color: #da65ecd4;
    font-weight: bold;
    font-style: normal;
    font-size: 17px;
    text-decoration: none;
    opacity: 0.1;
  }
</style>
