<script>
	export let hasSharedScripts;
	import { _app } from '$lib';

	function click() {
		$_app.scripts.showShared = !$_app.scripts.showShared;
	}
</script>

<button
	on:click={click}
	class:d-none={!hasSharedScripts}
	class="btn btn-secondary me-2 btn-sm py-2"
>
	{#if $_app.scripts.showShared}
		<i class="bi bi-chevron-down"></i>
	{/if}
	{#if !$_app.scripts.showShared}
		<i class="bi bi-chevron-right"></i>
	{/if}
</button>
