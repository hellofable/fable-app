<script>
	import { _app } from '$lib';

	function click() {
		$_app.scripts.showScripts = !$_app.scripts.showScripts;
	}
</script>

<button on:click={click} class="btn btn-secondary btn-sm py-2">
	{#if $_app.scripts.showScripts}
		<i class="bi bi-chevron-down"></i>
	{/if}
	{#if !$_app.scripts.showScripts}
		<i class="bi bi-chevron-right"></i>
	{/if}
</button>
