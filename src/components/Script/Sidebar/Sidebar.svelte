<script>
	import { _app } from '$lib';
	import SideCards from './SideCards/SideCards.svelte';
</script>

<div class:d-none={!$_app.sidebar.show} class="script-sidebar overflow-y-auto h-100 pointer p-3">
	{#if $_app.view.mode != 'text'}
		<div class="flex-grow-1"><SideCards /></div>
	{/if}
</div>

<style>
	.script-sidebar {
		flex: 0 0 355px;
	}
</style>
