<script>
  import { meta } from "tinro";
  const route = meta();

  import { _modal, _user } from "$lib";
  import Share from "../../Script/Share/Share.svelte";

  $: scriptId = $route.params.scriptId;

  function clickAdd(event) {
    _modal.open(Share, {
      title: "Share Document",
      buttons: {},
      hideHeader: false,
      componentProps: {
        fields: [],
        onSubmit: async (data) => {},
      },
    });
  }
</script>

<div class="d-flex flex-column">
  <button on:click={clickAdd} class="btn">
    <i class="bi bi-share-fill"></i>
  </button>
</div>
