<script>
  import { _app } from "$lib";
  import BottomButtonBar from "./BottomButtonBar/BottomButtonBar.svelte";

  import AccountCard from "/src/components/User/AccountCard/AccountCard.svelte";
  import SubscriptionCard from "/src/components/User/SubscriptionCard/SubscriptionCard.svelte";
  import Vault from "/src/components/Vault/Vault.svelte";
</script>

<div
  class="d-flex flex-column scripts-sidebar h-100"
  class:d-none={!$_app.scriptsSidebar.show}
>
  <div class="flex-grow-1 overflow-y-auto scroll">
    <Vault />

    <div
      class:d-none={$_app.scriptsSidebar.bottomButtons.selected !== "Account"}
      class="p-2"
    >
      <AccountCard />
      <SubscriptionCard />
    </div>
  </div>

  <BottomButtonBar />
</div>

<style>
  .scripts-sidebar {
    height: 100%;
    width: 300px;
    flex: 0 0 300px; /* Prevents flexbox from resizing it */
  }
</style>
