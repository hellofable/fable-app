<script>
  import { _app } from "$lib";
  import { onMount } from "svelte";
  import DarkLight from "./buttons/DarkLight.svelte";
  import SidebarToggle from "./buttons/SidebarToggle.svelte";
  import CollapseAllToggles from "./buttons/CollapseAllToggles.svelte";
  import Export from "./buttons/dropdowns/Export.svelte";
  import ToggleView from "./buttons/ToggleView.svelte";
  import User from "./buttons/dropdowns/User.svelte";
  import HomeButton from "./buttons/HomeButton.svelte";
  import FullScreenButton from "./buttons/FullScreenButton.svelte";
  import ShareButton from "./buttons/ShareButton.svelte";
  import TogglePrintable from "./buttons/TogglePrintable.svelte";

  let hasFullscreen = false;
  onMount(() => {
    if (document.documentElement.requestFullscreen) {
      hasFullscreen = true;
    } else {
    }
  });
</script>

<div class="d-flex h-100 flex-column toolbar">
  <SidebarToggle {_app} />
  <div class="mb-1"></div>
  <CollapseAllToggles {_app} type="expand" />
  <CollapseAllToggles {_app} type="collapse" />
  <div class="mb-1"></div>
  <ToggleView {_app} />
  <div class="mb-1"></div>
  <Export />

  <div class="mb-1"></div>
  <TogglePrintable />

  <div class="flex-grow-1"></div>
  <HomeButton />
  <div class="mb-1"></div>
  <ShareButton />
  <div class="mb-1"></div>

  {#if hasFullscreen}
    <DarkLight roundedClass="rounded-bottom-0" />
    <FullScreenButton roundedClass="rounded-top-0" />
  {/if}

  {#if !hasFullscreen}
    <DarkLight />
  {/if}

  <div class="mb-1"></div>
  <User />
</div>
