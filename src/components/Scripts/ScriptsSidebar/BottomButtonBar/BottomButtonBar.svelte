<script>
  import { _app } from "$lib";
</script>

<nav class="nav nav-pills nav-justified p-2">
  <a
    class="nav-link {$_app.scriptsSidebar.bottomButtons.selected === 'Account'
      ? 'active'
      : ''}"
    href={null}
    on:click={() => ($_app.scriptsSidebar.bottomButtons.selected = "Account")}
  >
    <i class="bi bi-person-circle"></i> Account
  </a>
  <a
    class="nav-link {$_app.scriptsSidebar.bottomButtons.selected === 'Vault'
      ? 'active'
      : ''}"
    href={null}
    on:click={() => ($_app.scriptsSidebar.bottomButtons.selected = "Vault")}
  >
    <i class="bi bi-hdd"></i> Backups
  </a>
</nav>
