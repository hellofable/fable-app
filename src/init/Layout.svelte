<script>
  import { onMount } from "svelte";

  import { meta, router, Route } from "tinro";
  const route = meta();

  import Script from "../pages/Script.svelte";
  import Scripts from "../pages/Scripts.svelte";

  onMount(() => {
    if ($route.url == "/") {
      router.goto("/scripts");
    }
  });
</script>

<Route path="/script/:scriptId">
  <Script />
</Route>
<Route path="/scripts">
  <Scripts />
</Route>
