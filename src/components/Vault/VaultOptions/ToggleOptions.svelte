<script>
	export let _app;
</script>

<button
	on:click={() => {
		$_app.scriptsSidebar.vault.showOptions = !$_app.scriptsSidebar.vault.showOptions;
	}}
	class="btn btn-sm text-center small w-100 p-0 rounded-0"
>
	{#if !$_app.scriptsSidebar.vault.showOptions}
		<i class="bi bi-caret-down-fill"></i>
	{/if}
	{#if $_app.scriptsSidebar.vault.showOptions}
		<i class="bi bi-caret-up-fill"></i>
	{/if}
</button>
