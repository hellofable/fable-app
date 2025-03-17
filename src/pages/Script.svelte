<script>
  import { _script, pb } from "$lib";
  import { onDestroy, onMount } from "svelte";

  import Script from "../components/Script/Script.svelte";

  import { meta, router } from "tinro";
  const route = meta();

  onMount(async () => {
    try {
      const script = await pb
        .collection("scripts")
        .getOne($route.params.scriptId);
      _script.set(script);
    } catch (error) {
      console.error("Error subscribing to user record:", error);
      router.goto("/not-found");
    }
  });
</script>

{#if $_script?.id}
  <Script script={$_script} />
{/if}
