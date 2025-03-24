<script>
  import { onMount } from "svelte";
  import { meta, router, Route } from "tinro";
  import { _route } from "$lib";
  const route = meta();
  import "../scss/index.scss";

  import Otp from "../components/User/Otp.svelte";

  import IsAuthenticatingSpinner from "../components/Other/IsAuthenticatingSpinner.svelte";

  import {
    _user,
    setBodyClasses,
    setPageTitle,
    pb,
    _app,
    setAppSettingsFromLocal,
    listenForIframeMessages,
  } from "$lib";
  import Layout from "./Layout.svelte";

  let fadeInClass = "";
  _app.updateSetting("isAuthenticating", true);

  onMount(async () => {
    setBodyClasses();
    setAppSettingsFromLocal();
    listenForIframeMessages();
    const user = await pb.auth.getUser();
  });

  $: setPageTitle($route.url);
  $: $_route = $route;

  document.addEventListener("click", (event) => {
    const allowedTags = ["A", "BUTTON", "INPUT"];
    if (allowedTags.includes(event.target.tagName)) return;

    // Check if the clicked element is inside an element with class .viewer
    if (!event.target.closest(".viewer")) {
      const url = new URL(window.location.href);
      if (url.search) {
        // Only update if query parameters exist
        router.goto(url.pathname, { replaceState: true });
      }
    }
  });
</script>

{#if $_user?.id}
  {#if $_app.isAuthenticating}
    <IsAuthenticatingSpinner />
  {/if}

  <div class:d-none={$_app.isAuthenticating} class="h-100 {fadeInClass}">
    <Layout />
  </div>
{/if}

{#if !$_user?.id}
  <Otp />
{/if}
