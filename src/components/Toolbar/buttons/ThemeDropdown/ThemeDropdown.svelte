<script>
  import { onMount } from "svelte";

  export let _app;

  onMount(() => {
    $_app.view.theme.bgImage = swatches[0].bgImage;
  });

  // Define the array of swatches with id and image link properties
  let swatches = [
    { id: "swatch-1", bgImage: "" },
    { id: "swatch-2", bgImage: "/pngs/skulls.png" },
    { id: "swatch-3", bgImage: "/pngs/gplay.png" },
    { id: "swatch-4", bgImage: "/pngs/axiom-pattern.png" },

    { id: "swatch-5", bgImage: "/pngs/wavecut.png" },
    { id: "swatch-6", bgImage: "/pngs/swirl.png" },
    { id: "swatch-7", bgImage: "/pngs/white-diamond.png" },

    { id: "swatch-8", bgImage: "/pngs/xv.png" },
  ];

  // Define the array of colors
  let opacity = 0.2;
  let colors = [
    `rgba(255, 0, 0, ${opacity})`,
    `rgba(0, 128, 0, ${opacity})`,
    `rgba(0, 0, 255, ${opacity})`,
    `rgba(255, 255, 0, ${opacity})`,
    `rgba(128, 0, 128, ${opacity})`,
    `rgba(255, 165, 0, ${opacity})`,
    `rgba(255, 192, 203, ${opacity})`,
    `rgba(0, 255, 255, ${opacity})`,
  ];

  function updateBgImage(swatch) {
    $_app.view.theme.bgImage = swatch.bgImage;
  }

  function updateColor(color) {
    $_app.view.theme.color = color;
  }

  let isOpen = false;
  let dropdownMenu;

  function toggleDropdown(event) {
    isOpen = !isOpen;
    event.stopPropagation(); // Prevent click propagation to document
  }

  function handleClickOutside(event) {
    if (dropdownMenu && !dropdownMenu.contains(event.target)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div
  class="example-dropdown dd-wrapper d-flex align-items-center dd pointer mt-1"
>
  <div class="dropdown dropend">
    <button
      class="btn btn-toolbar"
      type="button"
      on:click={toggleDropdown}
      aria-expanded={isOpen}
    >
      <i class="bi bi-image"></i>
    </button>
    <div
      class="dropdown-menu {isOpen ? 'show' : ''}"
      bind:this={dropdownMenu}
      aria-labelledby="dropdownMenuButton"
    >
      <div class="grid-container">
        {#each swatches as swatch}
          <div
            class="grid-item {swatch.bgImage === $_app.view.theme.bgImage
              ? 'selected'
              : ''}"
            style="background-image: url({swatch.bgImage});"
            title={swatch.id}
            on:click={() => updateBgImage(swatch)}
          ></div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    padding: 5px 10px;
  }
  .grid-item {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: 1px solid #ccc;

    border-radius: 5px;
  }
  .grid-item.selected {
    border: 2px solid #007bff;
    border-radius: 5px;
  }
  .grid-item.selected-color {
    border: 2px solid black;
  }
  .dropdown-menu.show {
    display: block;
    position: absolute;
    top: -20px;
    left: 45px;
    z-index: 1000;
    float: none;
    border-radius: 0px;
    border: 1px solid rgb(168, 168, 168);
  }
</style>
