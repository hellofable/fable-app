<script>
  import { onMount } from "svelte";
  import { _route } from "$lib";
  import { router, Route } from "tinro";

  import Script from "../pages/Script.svelte";
  import Scripts from "../pages/Scripts.svelte";

  onMount(() => {
    if ($_route.url == "/") {
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
